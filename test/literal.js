import test from 'tape'
import {assert} from '../index.js'

test('assert.literal()', function (t) {
  t.throws(
    function () {
      assert.literal({})
    },
    /node should have a type: `{}`$/,
    'should throw the same errors as `assert()`'
  )

  t.throws(
    function () {
      assert.literal({type: 'strong', children: []})
    },
    /literal should not have `children`: `{ type: 'strong', children: \[] }`$/,
    'should throw if the given node has `children`'
  )

  t.throws(
    function () {
      assert.literal({type: 'break'})
    },
    /literal should have `value`: `{ type: 'break' }`$/,
    'should throw if the given node has no `value`'
  )

  t.doesNotThrow(function () {
    assert.literal({type: 'text', value: 'foo'})
  }, 'should not throw on valid text nodes')

  t.end()
})
