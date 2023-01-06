import assert from 'node:assert/strict'
import test from 'node:test'
import {literal} from '../index.js'

test('literal()', () => {
  assert.throws(
    () => {
      literal({})
    },
    /node should have a type: `{}`$/,
    'should throw the same errors as `assert()`'
  )

  assert.throws(
    () => {
      literal({type: 'strong', children: []})
    },
    /literal should not have `children`: `{ type: 'strong', children: \[] }`$/,
    'should throw if the given node has `children`'
  )

  assert.throws(
    () => {
      literal({type: 'break'})
    },
    /literal should have `value`: `{ type: 'break' }`$/,
    'should throw if the given node has no `value`'
  )

  assert.doesNotThrow(() => {
    literal({type: 'text', value: 'foo'})
  }, 'should not throw on valid text nodes')
})
