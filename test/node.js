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

/* Tests. */
test('node', function (t) {
  t.throws(
    function () {
      assert();
    },
    /^AssertionError: node should be an object: `undefined`$/,
    'should throw if not given a node (#1)'
  );

  t.throws(
    function () {
      assert(null);
    },
    /^AssertionError: node should be an object: `null`$/,
    'should throw if not given a node (#2)'
  );

  t.throws(
    function () {
      assert('foo');
    },
    /^AssertionError: node should be an object: `'foo'`$/,
    'should throw if given a non-node (#1)'
  );

  t.throws(
    function () {
      assert(6);
    },
    /^AssertionError: node should be an object: `6`$/,
    'should throw if not given a non-node (#2)'
  );

  t.end();
});
