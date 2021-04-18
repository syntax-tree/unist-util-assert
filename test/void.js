import test from 'tape'
import {assert} from '../index.js'

test('assert.void()', function (t) {
  t.throws(
    function () {
      assert.void({})
    },
    /node should have a type: `{}`$/,
    'should throw the same errors as `assert()`'
  )

  t.throws(
    function () {
      assert.void({type: 'text', value: 'foo'})
    },
    /void should not have `value`: `{ type: 'text', value: 'foo' }`$/,
    'should throw if the given node has a `value`'
  )

  t.throws(
    function () {
      assert.void({type: 'strong', children: []})
    },
    /void should not have `children`: `{ type: 'strong', children: \[] }`$/,
    'should throw if the given node has `children`'
  )

  t.doesNotThrow(function () {
    assert.void({type: 'break'})
  }, 'should not throw on valid void nodes')

  t.end()
})
