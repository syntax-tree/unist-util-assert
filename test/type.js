import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('type', () => {
  nodeAssert.throws(
    () => {
      assert({})
    },
    /node should have a type: `{}`$/,
    'should throw if not given a `type` (#1)'
  )

  nodeAssert.throws(
    () => {
      assert({value: 'foo'})
    },
    /node should have a type: `{ value: 'foo' }`$/,
    'should throw if not given a type (#2)'
  )

  nodeAssert.throws(
    () => {
      assert({type: 1})
    },
    /`type` should be a string: `{ type: 1 }`$/,
    'should throw if not given a non-string type'
  )

  nodeAssert.throws(
    () => {
      assert({type: ''})
    },
    /`type` should not be empty: `{ type: '' }`$/,
    'should throw if given an empty string type'
  )

  nodeAssert.doesNotThrow(() => {
    assert({type: 'foo'})
  }, 'should not throw if given a non-empty type string')
})
