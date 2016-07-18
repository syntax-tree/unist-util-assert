/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module unist-util-assert
 * @fileoverview Test suite for `unist-util-assert`.
 */

'use strict';

/* eslint-env node */

/* Dependencies. */
var test = require('tape');
var assert = require('..');

test('assert.parent()', function (t) {
  t.throws(
    function () {
      assert.parent({});
    },
    /^AssertionError: node should have a type: `{}`$/,
    'should throw the same errors as `assert()`'
  );

  t.throws(
    function () {
      assert.parent({type: 'text', value: 'foo'});
    },
    /^AssertionError: parent should not have `value`: `{ type: 'text', value: 'foo' }`$/,
    'should throw if the given node has a `value`'
  );

  t.throws(
    function () {
      assert.parent({type: 'break'});
    },
    /^AssertionError: parent should have `children`: `{ type: 'break' }`$/,
    'should throw if the given node has `children`'
  );

  t.doesNotThrow(
    function () {
      assert.parent({type: 'strong', children: []});
    },
    'should not throw on valid void nodes'
  );

  t.end();
});
