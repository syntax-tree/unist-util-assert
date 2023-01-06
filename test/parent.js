import assert from 'node:assert/strict'
import test from 'node:test'
import {parent} from '../index.js'

test('parent()', () => {
  assert.throws(
    () => {
      parent({})
    },
    /node should have a type: `{}`$/,
    'should throw the same errors as `assert()`'
  )

  assert.throws(
    () => {
      parent({type: 'text', value: 'foo'})
    },
    /parent should not have `value`: `{ type: 'text', value: 'foo' }`$/,
    'should throw if the given node has a `value`'
  )

  assert.throws(
    () => {
      parent({type: 'break'})
    },
    /parent should have `children`: `{ type: 'break' }`$/,
    'should throw if the given node has `children`'
  )

  assert.doesNotThrow(() => {
    parent({type: 'strong', children: []})
  }, 'should not throw on valid void nodes')
})
