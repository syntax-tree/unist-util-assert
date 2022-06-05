/**
 * @typedef {import('assert').AssertionError} AssertionError
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist').Literal} Literal
 * @typedef {import('unist').Position} Position
 * @typedef {import('unist').Point} Point
 * @typedef {Node & {children: never, value: never}} _Void
 *
 * @typedef SeenErrorFields
 * @property {true} [__unist__]
 *
 * @typedef {Error & SeenErrorFields} SeenError
 */

import nodeAssert from 'node:assert'
import {inspect} from './inspect.js'

const own = {}.hasOwnProperty

/**
 * Assert that `node` is a valid unist node.
 * If `node` is a parent, all children will be asserted too.
 *
 * @param {unknown} [node]
 * @param {Parent} [parent]
 * @returns {asserts node is Node}
 */
export function assert(node, parent) {
  return wrap(assertNode)(node, parent)
}

/**
 * Assert that `node` is a valid unist parent.
 * All children will be asserted too.
 *
 * @param {unknown} [node]
 * @param {Parent} [parent]
 * @returns {asserts node is Parent}
 */
export function parent(node, parent) {
  return wrap(assertParent)(node, parent)
}

/**
 * Assert that `node` is a valid unist literal.
 *
 * @param {unknown} [node]
 * @param {Parent} [parent]
 * @returns {asserts node is Literal}
 */
export function literal(node, parent) {
  return wrap(assertLiteral)(node, parent)
}

/**
 * Assert that `node` is a valid unist node, but neither parent nor literal.
 *
 * @param {unknown} [node]
 * @param {Parent} [parent]
 * @returns {asserts node is _Void}
 */
export function _void(node, parent) {
  return wrap(assertVoid)(node, parent)
}

// Identifier to check if a value is seen.
const ID = '__unist__'

// List of specced properties.
const defined = new Set(['type', 'value', 'children', 'position'])

/**
 * Wrapper that adds the current node (and parent, if available) to error
 * messages.
 *
 * @param {(node?: any, parent?: Parent|null) => asserts node is Node} fn
 * @returns {(node?: any, parent?: Parent|null) => asserts node is Node}
 */
export function wrap(fn) {
  return wrapped

  /**
   * @param {unknown} node
   * @param {Parent|null|undefined} [parent]
   * @throws {AssertionError}
   * @returns {void}
   */
  function wrapped(node, parent) {
    try {
      fn(node, parent)
    } catch (error) {
      const exception = /** @type {SeenError} */ (error)
      if (!own.call(exception, ID)) {
        exception[ID] = true
        exception.message += ': `' + view(node) + '`'
        if (parent) exception.message += ' in `' + view(parent) + '`'
      }

      throw error
    }
  }
}

/**
 * Assert.
 *
 * @param {unknown} node
 * @returns {asserts node is Node}
 */
function assertNode(node) {
  let index = -1

  nodeAssert.ok(
    node && typeof node === 'object' && !Array.isArray(node),
    'node should be an object'
  )

  nodeAssert.ok(own.call(node, 'type'), 'node should have a type')
  nodeAssert.strictEqual(
    // @ts-expect-error Looks like an indexed object.
    typeof node.type,
    'string',
    '`type` should be a string'
  )
  // @ts-expect-error Looks like an indexed object.
  nodeAssert.notStrictEqual(node.type, '', '`type` should not be empty')

  // @ts-expect-error Looks like an indexed object.
  if (node.value !== null && node.value !== undefined) {
    nodeAssert.strictEqual(
      // @ts-expect-error Looks like an indexed object.
      typeof node.value,
      'string',
      '`value` should be a string'
    )
  }

  // @ts-expect-error Looks like an indexed object.
  position(node.position)

  /** @type {string} */
  let key

  for (key in node) {
    if (!defined.has(key)) {
      /** @type {unknown} */
      // @ts-expect-error: hush.
      const value = node[key]
      vanilla(key, value)
    }
  }

  // @ts-expect-error Looks like an indexed object.
  if (node.children !== null && node.children !== undefined) {
    /** @type {Parent} */
    // @ts-expect-error Looks like parent.
    const parent = node
    nodeAssert.ok(
      Array.isArray(parent.children),
      '`children` should be an array'
    )
    index = -1

    while (++index < parent.children.length) {
      assert(parent.children[index], parent)
    }
  }
}

/**
 * Assert `value` (which lives at `key`) can be stringified and re-parsed to the
 * same (deep) value.
 *
 * @param {string} key
 * @param {unknown} value
 */
function vanilla(key, value) {
  try {
    nodeAssert.deepStrictEqual(value, JSON.parse(JSON.stringify(value)))
  } catch {
    nodeAssert.fail('non-specced property `' + key + '` should be JSON')
  }
}

/**
 * Stringify a value to inspect it.
 * Tries `JSON.stringify()`, and if that fails uses `String()` instead.
 *
 * @param {unknown} value
 * @returns {string}
 */
function view(value) {
  try {
    return inspect(value)
    /* c8 ignore next 3 */
  } catch {
    return String(value)
  }
}

/**
 * Assert `node` is a parent node.
 *
 * @param {Node} node
 * @returns {asserts node is Parent}
 */
function assertParent(node) {
  assertNode(node)

  nodeAssert.strictEqual(
    'value' in node,
    false,
    'parent should not have `value`'
  )
  nodeAssert.ok('children' in node, 'parent should have `children`')
}

/**
 * Assert `node` is a literal node.
 *
 * @param {Node} node
 * @returns {asserts node is Literal}
 */
function assertLiteral(node) {
  assertNode(node)

  nodeAssert.strictEqual(
    'children' in node,
    false,
    'literal should not have `children`'
  )
  nodeAssert.ok('value' in node, 'literal should have `value`')
}

/**
 * Assert `node` is a unist node, but neither parent nor literal.
 *
 * @param {Node} node
 * @returns {asserts node is _Void}
 */
function assertVoid(node) {
  assertNode(node)

  nodeAssert.strictEqual('value' in node, false, 'void should not have `value`')
  nodeAssert.strictEqual(
    'children' in node,
    false,
    'void should not have `children`'
  )
}

/**
 * Assert `position` is a unist position.
 *
 * @param {Position} position
 * @returns {asserts position is Position}
 */
function position(position) {
  if (position !== null && position !== undefined) {
    nodeAssert.ok(
      position === Object(position),
      '`position` should be an object'
    )

    point(position.start, 'position.start')
    point(position.end, 'position.end')
  }
}

/**
 * Assert `point` is a unist point.
 *
 * @param {Point} point
 * @param {string} label
 * @returns {asserts point is Point}
 */
function point(point, label) {
  if (point !== null && point !== undefined) {
    nodeAssert.ok(
      point === Object(point),
      '`' + label + '` should be an object'
    )

    if (point.line !== null && point.line !== undefined) {
      nodeAssert.ok(
        'line' in point,
        '`' + label + '` should have numeric `line`'
      )
      nodeAssert.ok(point.line >= 1, '`' + label + '.line` should be gte `1`')
    }

    if (point.column !== null && point.column !== undefined) {
      nodeAssert.ok(
        'column' in point,
        '`' + label + '` should have numeric `column`'
      )
      nodeAssert.ok(
        point.column >= 1,
        '`' + label + '.column` should be gte `1`'
      )
    }
  }
}
