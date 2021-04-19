/**
 * @typedef {import('unist').Node} Node
 * @typedef {import('unist').Parent} Parent
 * @typedef {import('unist').Literal} Literal
 * @typedef {import('unist').Position} Position
 * @typedef {import('unist').Point} Point
 *
 * @typedef {import('assert').AssertionError} AssertionError
 *
 * @typedef {Node & {children: never, value: never}} Void
 */

import nodeAssert from 'assert'
import {inspect} from './inspect.js'

var own = {}.hasOwnProperty

var ok = /** @type {wrap<Node>(assertNode)} */ wrap(assertNode)

export var assert = Object.assign(ok, {
  parent: /** @type {wrap<Parent>(parent)} */ wrap(parent),
  literal: /** @type {wrap<Literal>(literal)} */ wrap(literal),
  void: /** @type {wrap<Void>(empty)} */ wrap(empty)
})

// Identifier to check if a value is seen.
var ID = '__unist__'

// List of specced properties.
var defined = new Set(['type', 'value', 'children', 'position'])

/**
 * Wrapper around `Node` which adds the current node (and parent, if available),
 * to the message.
 *
 * @template {Node} T
 * @param {(node?: T, parent?: Parent|null) => asserts node is T} fn
 * @returns {(node?: T, parent?: Parent|null) => asserts node is T}
 */
export function wrap(fn) {
  return wrapped

  /**
   * @param {T} node
   * @param {Parent} [parent]
   * @throws {AssertionError}
   * @returns {asserts node is T}
   */
  function wrapped(node, parent) {
    try {
      fn(node, parent)
    } catch (error) {
      if (!own.call(error, ID)) {
        error[ID] = true
        error.message += ': `' + view(node) + '`'
        if (parent) error.message += ' in `' + view(parent) + '`'
      }

      throw error
    }
  }
}

/**
 * Assert.
 *
 * @param {Node} node
 * @returns {asserts node is Node}
 */
function assertNode(node) {
  var index = -1
  /** @type {Parent} */
  var parent
  /** @type {Node} */
  var child
  /** @type {string} */
  var key

  nodeAssert.ok(
    typeof node === 'object' && !Array.isArray(node),
    'node should be an object'
  )

  nodeAssert.ok(own.call(node, 'type'), 'node should have a type')
  nodeAssert.strictEqual(
    typeof node.type,
    'string',
    '`type` should be a string'
  )
  nodeAssert.notStrictEqual(node.type, '', '`type` should not be empty')

  if (node.value !== null && node.value !== undefined) {
    nodeAssert.strictEqual(
      typeof node.value,
      'string',
      '`value` should be a string'
    )
  }

  position(node.position)

  for (key in node) {
    if (!defined.has(key)) {
      vanilla(key, node[key])
    }
  }

  if (node.children !== null && node.children !== undefined) {
    // @ts-ignore hush TS.
    parent = node
    nodeAssert.ok(
      Array.isArray(parent.children),
      '`children` should be an array'
    )
    index = -1

    while (++index < parent.children.length) {
      child = parent.children[index]
      ok(child, parent)
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
function parent(node) {
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
function literal(node) {
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
 * @returns {asserts node is Void}
 */
function empty(node) {
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
