import test from 'tape'
import {parent} from '../index.js'

test('parent()', (t) => {
  t.throws(
    () => {
      parent({})
    },
    /node should have a type: `{}`$/,
    'should throw the same errors as `assert()`'
  )

  t.throws(
    () => {
      parent({type: 'text', value: 'foo'})
    },
    /parent should not have `value`: `{ type: 'text', value: 'foo' }`$/,
    'should throw if the given node has a `value`'
  )

  t.throws(
    () => {
      parent({type: 'break'})
    },
    /parent should have `children`: `{ type: 'break' }`$/,
    'should throw if the given node has `children`'
  )

  t.doesNotThrow(() => {
    parent({type: 'strong', children: []})
  }, 'should not throw on valid void nodes')

  t.end()
})
