import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('value', async function (t) {
  await t.test('should throw if given a non-string `value`', async function () {
    nodeAssert.throws(function () {
      assert({type: 'foo', value: 1})
    }, /`value` should be a string: `{ type: 'foo', value: 1 }`$/)
  })

  await t.test(
    'should not throw if given an empty string `value`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', value: ''})
      })
    }
  )

  await t.test(
    'should not throw if given an string `value`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', value: 'foo'})
      })
    }
  )

  await t.test(
    'should not throw if given an undefined `value`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', value: undefined})
      })
    }
  )

  await t.test('should not throw if given an null `value`', async function () {
    nodeAssert.doesNotThrow(function () {
      assert({type: 'foo', value: null})
    })
  })
})
