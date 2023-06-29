import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('node', async function (t) {
  await t.test('should throw if not given a node (#1)', async function () {
    nodeAssert.throws(function () {
      assert()
    }, /node should be an object: `undefined`$/)
  })

  await t.test('should throw if not given a node (#2)', async function () {
    nodeAssert.throws(function () {
      assert(null)
    }, /node should be an object: `null`$/)
  })

  await t.test('should throw if given a non-node (#1)', async function () {
    nodeAssert.throws(function () {
      assert('foo')
    }, /node should be an object: `'foo'`$/)
  })

  await t.test('should throw if not given a non-node (#2)', async function () {
    nodeAssert.throws(function () {
      assert(6)
    }, /node should be an object: `6`$/)
  })
})
