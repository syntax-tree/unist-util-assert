'use strict'

var assert = require('assert')
var array = require('x-is-array')
var object = require('x-is-object')

var inspect

try {
  // eslint-disable-next-line no-useless-concat
  inspect = require('ut' + 'il').inspect
} catch (_) {}

exports = wrap(unist)
module.exports = exports

exports.parent = wrap(parent)
exports.text = wrap(text)
exports.void = wrap(empty)
exports.wrap = wrap

// Identifier to check if a value is seen.
var ID = '__unist__'

// List of specced properties.
var defined = ['type', 'value', 'children', 'position']

// Wrapper around `Node` which adds the current node (and parent, if available),
// to the message.
function wrap(fn) {
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
function unist(node) {
  var type
  var children
  var value
  var key
  var index
  var length

  assert.ok(object(node), 'node should be an object')

  type = node.type
  children = node.children
  value = node.value

  assert.ok('type' in node, 'node should have a type')
  assert.strictEqual(typeof type, 'string', '`type` should be a string')
  assert.notStrictEqual(type, '', '`type` should not be empty')

  if (value != null) {
    assert.strictEqual(typeof value, 'string', '`value` should be a string')
  }

  position(node.position)

  for (key in node) {
    if (!defined.includes(key)) {
      vanilla(key, node[key])
    }
  }

  if (children != null) {
    assert.ok(array(children), '`children` should be an array')
    index = -1
    length = children.length

    while (++index < length) {
      exports(children[index], node)
    }
  }
}

// Assert `value` (which lives at `key`) can be stringified and re-parsed to the
// same (deep) value.
function vanilla(key, value) {
  try {
    assert.deepStrictEqual(value, JSON.parse(JSON.stringify(value)))
  } catch (_) {
    assert.fail('non-specced property `' + key + '` should be JSON')
  }
}

// Stringify a value to inspect it.
// Tries `JSON.stringify()`, and if that fails uses `String()` instead.
function view(value) {
  try {
    /* istanbul ignore next - Browser. */
    return inspect ? inspect(value, {colors: false}) : JSON.stringify(value)
  } catch (_) {
    /* istanbul ignore next - Cyclical. */
    return String(value)
  }
}

// Assert `node` is a parent node.
function parent(node) {
  unist(node)

  assert.strictEqual('value' in node, false, 'parent should not have `value`')
  assert.ok('children' in node, 'parent should have `children`')
}

// Assert `node` is a text node.
function text(node) {
  unist(node)

  assert.strictEqual(
    'children' in node,
    false,
    'text should not have `children`'
  )
  assert.ok('value' in node, 'text should have `value`')
}

// Assert `node` is a unist node, but neither parent nor text.
function empty(node) {
  unist(node)

  assert.strictEqual('value' in node, false, 'void should not have `value`')
  assert.strictEqual(
    'children' in node,
    false,
    'void should not have `children`'
  )
}

// Assert `position` is a unist position.
function position(position) {
  if (position != null) {
    assert.ok(object(position), '`position` should be an object')

    point(position.start, 'position.start')
    point(position.end, 'position.end')
  }
}

// Assert `point` is a unist point.
function point(point, name) {
  if (point != null) {
    assert.ok(object(point), '`' + name + '` should be an object')

    if (point.line != null) {
      assert.ok('line' in point, '`' + name + '` should have numeric `line`')
      assert.ok(point.line >= 1, '`' + name + '.line` should be gte `1`')
    }

    if (point.column != null) {
      assert.ok(
        'column' in point,
        '`' + name + '` should have numeric `column`'
      )
      assert.ok(point.column >= 1, '`' + name + '.column` should be gte `1`')
    }
  }
}
