import test from 'tape'
import {literal} from '../index.js'

test('literal()', (t) => {
  t.throws(
    () => {
      literal({})
    },
    /node should have a type: `{}`$/,
    'should throw the same errors as `assert()`'
  )

  t.throws(
    () => {
      literal({type: 'strong', children: []})
    },
    /literal should not have `children`: `{ type: 'strong', children: \[] }`$/,
    'should throw if the given node has `children`'
  )

  t.throws(
    () => {
      literal({type: 'break'})
    },
    /literal should have `value`: `{ type: 'break' }`$/,
    'should throw if the given node has no `value`'
  )

  t.doesNotThrow(() => {
    literal({type: 'text', value: 'foo'})
  }, 'should not throw on valid text nodes')

  t.end()
})
