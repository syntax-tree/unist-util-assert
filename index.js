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
 * Assert that `tree` is a valid unist node.
 *
 * If `node` is a parent, all children will be asserted too.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @param {Parent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts tree is Node}
 *   Whether `tree` (and its descendants) are valid nodes.
 * @throws {AssertionError}
 *   When `tree` (or its descendants) is not a node.
 */
export function assert(tree, parent) {
  return wrap(assertNode)(tree, parent)
}

/**
 * Assert that `tree` is a valid unist parent.
 *
 * All children will be asserted too.
 *
 * @param {unknown} [tree]
 *   Thing to assert.
 * @param {Parent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts tree is Parent}
 *   Whether `tree` is a parent and its descendants are valid nodes.
 * @throws {AssertionError}
 *   When `tree` is not a parent or its descendants are not nodes.
 */
export function parent(tree, parent) {
  return wrap(assertParent)(tree, parent)
}

/**
 * Assert that `node` is a valid unist literal.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @param {Parent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts node is Literal}
 *   Whether `node` is a literal.
 * @throws {AssertionError}
 *   When `node` is not a literal.
 */
export function literal(node, parent) {
  return wrap(assertLiteral)(node, parent)
}

/**
 * Assert that `node` is a valid void node.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @param {Parent | null | undefined} [parent]
 *   Optional, valid parent.
 * @returns {asserts node is _Void}
 *   Whether `node` is a node but neither parent nor literal.
 * @throws {AssertionError}
 *   When `node` is not a node, a parent, or a literal.
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
 * @template {Node} T
 *   Node type.
 * @param {(node?: any, parent?: Parent | null | undefined) => asserts node is T} fn
 *   Custom assertion.
 * @returns {(node?: any, parent?: Parent | null | undefined) => asserts node is T}
 *   Assertion.
 */
export function wrap(fn) {
  return wrapped

  /**
   * @param {unknown} node
   *   Thing to check.
   * @param {Parent | null | undefined} [parent]
   *   Optional, valid parent.
   * @throws {AssertionError}
   *   Whether `node` is a node but neither parent nor literal.
   * @returns {void}
   *   Nothing.
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
 * Assert that `node` is a valid unist parent.
 *
 * All children will be asserted too.
 *
 * @param {unknown} node
 *   Thing to assert.
 * @returns {asserts node is Node}
 *   Whether `node` (and its descendants) are valid nodes.
 * @throws {AssertionError}
 *   When `node` (or its descendants) is not a node.
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
 *   Name of field.
 * @param {unknown} value
 *   Value of field.
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
 *
 * Tries `JSON.stringify()`, and if that fails uses `String()` instead.
 *
 * @param {unknown} value
 *  Anything (should be JSON).
 * @returns {string}
 *   User-visible preresentation.
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
 * Assert that `node` is a valid unist parent.
 *
 * All children will be asserted too.
 *
 * @param {Node} node
 *   Thing to assert.
 * @returns {asserts node is Parent}
 *   Whether `node` is a parent and its descendants are valid nodes.
 * @throws {AssertionError}
 *   When `node` is not a parent or its descendants are not nodes.
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
 * Assert that `node` is a valid unist literal.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @returns {asserts node is Literal}
 *   Whether `node` is a literal.
 * @throws {AssertionError}
 *   When `node` is not a literal.
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
 * Assert that `node` is a valid void node.
 *
 * @param {unknown} [node]
 *   Thing to assert.
 * @returns {asserts node is _Void}
 *   Whether `node` is a node but neither parent nor literal.
 * @throws {AssertionError}
 *   When `node` is not a node, a parent, or a literal.
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
 * Assert that `position` is a unist position.
 *
 * @param {unknown} position
 *   Thing to assert.
 * @returns {asserts position is Position}
 *   Whether `position` is a unist position.
 * @throws {AssertionError}
 *   When `position` is not a position.
 */
function position(position) {
  if (position !== null && position !== undefined) {
    nodeAssert.ok(
      typeof position === 'object' && position === Object(position),
      '`position` should be an object'
    )

    // @ts-expect-error: indexable.
    point(position.start, 'position.start')
    // @ts-expect-error: indexable.
    point(position.end, 'position.end')
  }
}

/**
 * Assert `point` is a unist point.
 *
 * @param {unknown} point
 *   Thing to assert.
 * @param {string} label
 *   Whether `point` is a unist point.
 * @returns {asserts point is Point}
 *   When `point` is not a point.
 */
function point(point, label) {
  if (point !== null && point !== undefined) {
    nodeAssert.ok(
      typeof point === 'object' && point === Object(point),
      '`' + label + '` should be an object'
    )

    if ('line' in point && point.line !== null && point.line !== undefined) {
      nodeAssert.ok(
        typeof point.line === 'number',
        '`' + label + '` should have numeric `line`'
      )
      nodeAssert.ok(point.line >= 1, '`' + label + '.line` should be gte `1`')
    }

    if (
      'column' in point &&
      point.column !== null &&
      point.column !== undefined
    ) {
      nodeAssert.ok(
        typeof point.column === 'number',
        '`' + label + '` should have numeric `column`'
      )
      nodeAssert.ok(
        point.column >= 1,
        '`' + label + '.column` should be gte `1`'
      )
    }
  }
}
