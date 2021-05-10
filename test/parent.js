import test from 'tape'
import {parent} from '../index.js'

test('parent()', function (t) {
  t.throws(
    function () {
      parent({})
    },
    /node should have a type: `{}`$/,
    'should throw the same errors as `assert()`'
  )

  t.throws(
    function () {
      parent({type: 'text', value: 'foo'})
    },
    /parent should not have `value`: `{ type: 'text', value: 'foo' }`$/,
    'should throw if the given node has a `value`'
  )

  t.throws(
    function () {
      parent({type: 'break'})
    },
    /parent should have `children`: `{ type: 'break' }`$/,
    'should throw if the given node has `children`'
  )

  t.doesNotThrow(function () {
    parent({type: 'strong', children: []})
  }, 'should not throw on valid void nodes')

  t.end()
})
