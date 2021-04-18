import nodeAssert from 'assert'
import {inspect} from './inspect.js'

export var assert = wrap(assertNode)
assert.parent = wrap(parent)
assert.text = wrap(text)
assert.void = wrap(empty)

// Identifier to check if a value is seen.
var ID = '__unist__'

// List of specced properties.
var defined = new Set(['type', 'value', 'children', 'position'])

// Wrapper around `Node` which adds the current node (and parent, if available),
// to the message.
export function wrap(fn) {
  return wrapped

  function wrapped(node, parent) {
    try {
      fn(node, parent)
    } catch (error) {
      if (!error[ID]) {
        error[ID] = true

        error.message += ': `' + view(node) + '`'

        if (parent) {
          error.message += ' in `' + view(parent) + '`'
        }
      }

      throw error
    }
  }
}

// Assert.
function assertNode(node) {
  var type
  var children
  var value
  var key
  var index
  var length

  nodeAssert.ok(node === Object(node), 'node should be an object')

  type = node.type
  children = node.children
  value = node.value

  nodeAssert.ok('type' in node, 'node should have a type')
  nodeAssert.strictEqual(typeof type, 'string', '`type` should be a string')
  nodeAssert.notStrictEqual(type, '', '`type` should not be empty')

  if (value !== null && value !== undefined) {
    nodeAssert.strictEqual(typeof value, 'string', '`value` should be a string')
  }

  position(node.position)

  for (key in node) {
    if (!defined.has(key)) {
      vanilla(key, node[key])
    }
  }

  if (children !== null && children !== undefined) {
    nodeAssert.ok(Array.isArray(children), '`children` should be an array')
    index = -1
    length = children.length

    while (++index < length) {
      assert(children[index], node)
    }
  }
}

// Assert `value` (which lives at `key`) can be stringified and re-parsed to the
// same (deep) value.
function vanilla(key, value) {
  try {
    nodeAssert.deepStrictEqual(value, JSON.parse(JSON.stringify(value)))
  } catch {
    nodeAssert.fail('non-specced property `' + key + '` should be JSON')
  }
}

// Stringify a value to inspect it.
// Tries `JSON.stringify()`, and if that fails uses `String()` instead.
function view(value) {
  try {
    return inspect(value)
    /* c8 ignore next 3 */
  } catch {
    return String(value)
  }
}

// Assert `node` is a parent node.
function parent(node) {
  assertNode(node)

  nodeAssert.strictEqual(
    'value' in node,
    false,
    'parent should not have `value`'
  )
  nodeAssert.ok('children' in node, 'parent should have `children`')
}

// Assert `node` is a text node.
function text(node) {
  assertNode(node)

  nodeAssert.strictEqual(
    'children' in node,
    false,
    'text should not have `children`'
  )
  nodeAssert.ok('value' in node, 'text should have `value`')
}

// Assert `node` is a unist node, but neither parent nor text.
function empty(node) {
  assertNode(node)

  nodeAssert.strictEqual('value' in node, false, 'void should not have `value`')
  nodeAssert.strictEqual(
    'children' in node,
    false,
    'void should not have `children`'
  )
}

// Assert `position` is a unist position.
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

// Assert `point` is a unist point.
function point(point, name) {
  if (point !== null && point !== undefined) {
    nodeAssert.ok(point === Object(point), '`' + name + '` should be an object')

    if (point.line !== null && point.line !== undefined) {
      nodeAssert.ok(
        'line' in point,
        '`' + name + '` should have numeric `line`'
      )
      nodeAssert.ok(point.line >= 1, '`' + name + '.line` should be gte `1`')
    }

    if (point.column !== null && point.column !== undefined) {
      nodeAssert.ok(
        'column' in point,
        '`' + name + '` should have numeric `column`'
      )
      nodeAssert.ok(
        point.column >= 1,
        '`' + name + '.column` should be gte `1`'
      )
    }
  }
}
