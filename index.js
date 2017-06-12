'use strict';

/* Dependencies. */
var assert = require('assert');
var array = require('x-is-array');
var object = require('x-is-object');

var inspect;

try {
  // eslint-disable-next-line import/no-dynamic-require, no-useless-concat
  inspect = require('ut' + 'il').inspect;
} catch (err) { /* Empty. */ }

/* Expose. */
exports = wrap(unist);
module.exports = exports;

exports.parent = wrap(parent);
exports.text = wrap(text);
exports.void = wrap(empty);
exports.wrap = wrap;

/* Identifier to check if a value is seen. */
var ID = '__unist__';

/* List of specced properties. */
var defined = ['type', 'value', 'children', 'position'];

/* Wrapper around `Node` which adds the current node
 * (and parent, if available), to the message. */
function wrap(fn) {
  return wrapped;

  function wrapped(node, parent) {
    try {
      fn(node, parent);
    } catch (err) {
      if (!err[ID]) {
        err[ID] = true;

        err.message += ': `' + view(node) + '`';

        if (parent) {
          err.message += ' in `' + view(parent) + '`';
        }
      }

      throw err;
    }
  }
}

/* Assert. */
function unist(node) {
  var type;
  var children;
  var value;
  var key;
  var index;
  var length;

  assert.ok(object(node), 'node should be an object');

  type = node.type;
  children = node.children;
  value = node.value;

  assert.ok('type' in node, 'node should have a type');
  assert.equal(typeof type, 'string', '`type` should be a string');
  assert.notEqual(type, '', '`type` should not be empty');

  if (value != null) {
    assert.equal(typeof value, 'string', '`value` should be a string');
  }

  location(node.position);

  for (key in node) {
    if (defined.indexOf(key) === -1) {
      vanilla(key, node[key]);
    }
  }

  if (children != null) {
    assert.ok(array(children), '`children` should be an array');
    index = -1;
    length = children.length;

    while (++index < length) {
      exports(children[index], node);
    }
  }
}

/* Assert `value` (which lives at `key`) can be stringified
 * and re-parsed to the same (deep) value. */
function vanilla(key, value) {
  try {
    assert.deepEqual(value, JSON.parse(JSON.stringify(value)));
  } catch (err) {
    assert.fail('', '', 'non-specced property `' + key + '` should be JSON');
  }
}

/* Stringify a value to inspect it.  Tries `JSON.stringify()`,
 * and if that fails uses `String()` instead.  If `stringify()`
 * works. */
function view(value) {
  try {
    /* eslint-disable no-else-return */
    /* istanbul ignore else - Browser. */
    if (inspect) {
      return inspect(value, {colors: false});
    } else {
      return JSON.stringify(value);
    }
  } catch (err) {
    /* istanbul ignore next - Cyclical. */
    return String(value);
  }
}

/* Assert `node` is a parent node. */
function parent(node) {
  unist(node);

  assert.equal('value' in node, false, 'parent should not have `value`');
  assert.ok('children' in node, 'parent should have `children`');
}

/* Assert `node` is a text node. */
function text(node) {
  unist(node);

  assert.equal('children' in node, false, 'text should not have `children`');
  assert.ok('value' in node, 'text should have `value`');
}

/* Assert `node` is a Unist node, but neither parent nor
 * text. */
function empty(node) {
  unist(node);

  assert.equal('value' in node, false, 'void should not have `value`');
  assert.equal('children' in node, false, 'void should not have `children`');
}

/* Assert `location` is a Unist Location. */
function location(location) {
  if (location != null) {
    assert.ok(object(location), '`position` should be an object');

    position(location.start, 'position.start');
    position(location.end, 'position.end');
  }
}

/* Assert `location` is a Unist Location. */
function position(position, name) {
  if (position != null) {
    assert.ok(object(position), '`' + name + '` should be an object');

    if (position.line != null) {
      assert.ok('line' in position, '`' + name + '` should have numeric `line`');
      assert.ok(position.line >= 1, '`' + name + '.line` should be gte `1`');
    }

    if (position.column != null) {
      assert.ok('column' in position, '`' + name + '` should have numeric `column`');
      assert.ok(position.column >= 1, '`' + name + '.column` should be gte `1`');
    }
  }
}
