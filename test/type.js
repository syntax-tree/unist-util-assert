import test from 'tape'
import {assert} from '../index.js'

test('type', function (t) {
  t.throws(
    function () {
      assert({})
    },
    /node should have a type: `{}`$/,
    'should throw if not given a `type` (#1)'
  )

  t.throws(
    function () {
      assert({value: 'foo'})
    },
    /node should have a type: `{ value: 'foo' }`$/,
    'should throw if not given a type (#2)'
  )

  t.throws(
    function () {
      assert({type: 1})
    },
    /`type` should be a string: `{ type: 1 }`$/,
    'should throw if not given a non-string type'
  )

  t.throws(
    function () {
      assert({type: ''})
    },
    /`type` should not be empty: `{ type: '' }`$/,
    'should throw if given an empty string type'
  )

  t.doesNotThrow(function () {
    assert({type: 'foo'})
  }, 'should not throw if given a non-empty type string')

  t.end()
})
