import assert from 'node:assert/strict'
import test from 'node:test'
import {literal} from '../index.js'

test('literal()', async function (t) {
  await t.test('should throw the same errors as `assert()`', async function () {
    assert.throws(function () {
      literal({})
    }, /node should have a type: `{}`$/)
  })

  await t.test(
    'should throw if the given node has `children`',
    async function () {
      assert.throws(function () {
        literal({type: 'strong', children: []})
      }, /literal should not have `children`: `{ type: 'strong', children: \[] }`$/)
    }
  )

  await t.test(
    'should throw if the given node has no `value`',
    async function () {
      assert.throws(function () {
        literal({type: 'break'})
      }, /literal should have `value`: `{ type: 'break' }`$/)
    }
  )

  await t.test('should not throw on valid text nodes', async function () {
    assert.doesNotThrow(function () {
      literal({type: 'text', value: 'foo'})
    })
  })
})
