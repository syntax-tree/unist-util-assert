import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('node', () => {
  nodeAssert.throws(
    () => {
      assert()
    },
    /node should be an object: `undefined`$/,
    'should throw if not given a node (#1)'
  )

  nodeAssert.throws(
    () => {
      assert(null)
    },
    /node should be an object: `null`$/,
    'should throw if not given a node (#2)'
  )

  nodeAssert.throws(
    () => {
      assert('foo')
    },
    /node should be an object: `'foo'`$/,
    'should throw if given a non-node (#1)'
  )

  nodeAssert.throws(
    () => {
      assert(6)
    },
    /node should be an object: `6`$/,
    'should throw if not given a non-node (#2)'
  )
})
