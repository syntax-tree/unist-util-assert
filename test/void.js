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

test('assert.void()', function (t) {
  t.throws(
    function () {
      assert.void({});
    },
    /^AssertionError: node should have a type: `{}`$/,
    'should throw the same errors as `assert()`'
  );

  t.throws(
    function () {
      assert.void({type: 'text', value: 'foo'});
    },
    /^AssertionError: void should not have `value`: `{ type: 'text', value: 'foo' }`$/,
    'should throw if the given node has a `value`'
  );

  t.throws(
    function () {
      assert.void({type: 'strong', children: []});
    },
    /^AssertionError: void should not have `children`: `{ type: 'strong', children: \[] }`$/,
    'should throw if the given node has `children`'
  );

  t.doesNotThrow(
    function () {
      assert.void({type: 'break'});
    },
    'should not throw on valid void nodes'
  );

  t.end();
});
