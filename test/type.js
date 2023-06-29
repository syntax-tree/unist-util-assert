import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('type', async function (t) {
  await t.test('should throw if not given a `type` (#1)', async function () {
    nodeAssert.throws(function () {
      assert({})
    }, /node should have a type: `{}`$/)
  })

  await t.test('should throw if not given a type (#2)', async function () {
    nodeAssert.throws(function () {
      assert({value: 'foo'})
    }, /node should have a type: `{ value: 'foo' }`$/)
  })

  await t.test(
    'should throw if not given a non-string type',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 1})
      }, /`type` should be a string: `{ type: 1 }`$/)
    }
  )

  await t.test('should throw if given an empty string type', async function () {
    nodeAssert.throws(function () {
      assert({type: ''})
    }, /`type` should not be empty: `{ type: '' }`$/)
  })

  await t.test(
    'should not throw if given a non-empty type string',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo'})
      })
    }
  )
})
