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
test('type', function (t) {
  t.throws(
    function () {
      assert([1, 5]);
    },
    /^AssertionError: node should have a type: `\[ 1, 5 \]`$/,
    'should throw if not given a `type` (#1)'
  );

  t.throws(
    function () {
      assert({value: 'foo'});
    },
    /^AssertionError: node should have a type: `{ value: 'foo' }`$/,
    'should throw if not given a type (#2)'
  );

  t.throws(
    function () {
      assert({type: 1});
    },
    /^AssertionError: `type` should be a string: `{ type: 1 }`$/,
    'should throw if not given a non-string type'
  );

  t.throws(
    function () {
      assert({type: ''});
    },
    /^AssertionError: `type` should not be empty: `{ type: '' }`$/,
    'should throw if given an empty string type'
  );

  t.doesNotThrow(
    function () {
      assert({type: 'foo'});
    },
    'should not throw if given a non-empty type string'
  );

  t.end();
});
