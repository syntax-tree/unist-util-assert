import test from 'tape'
import {_void} from '../index.js'

test('_void()', function (t) {
  t.throws(
    function () {
      _void({})
    },
    /node should have a type: `{}`$/,
    'should throw the same errors as `assert()`'
  )

  t.throws(
    function () {
      _void({type: 'text', value: 'foo'})
    },
    /void should not have `value`: `{ type: 'text', value: 'foo' }`$/,
    'should throw if the given node has a `value`'
  )

  t.throws(
    function () {
      _void({type: 'strong', children: []})
    },
    /void should not have `children`: `{ type: 'strong', children: \[] }`$/,
    'should throw if the given node has `children`'
  )

  t.doesNotThrow(function () {
    _void({type: 'break'})
  }, 'should not throw on valid void nodes')

  t.end()
})
