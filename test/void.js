import assert from 'node:assert/strict'
import test from 'node:test'
import {_void} from '../index.js'

test('_void()', async function (t) {
  await t.test('should throw the same errors as `assert()`', async function () {
    assert.throws(function () {
      _void({})
    }, /node should have a type: `{}`$/)
  })

  await t.test(
    'should throw if the given node has a `value`',
    async function () {
      assert.throws(function () {
        _void({type: 'text', value: 'foo'})
      }, /void should not have `value`: `{ type: 'text', value: 'foo' }`$/)
    }
  )

  await t.test(
    'should throw if the given node has `children`',
    async function () {
      assert.throws(function () {
        _void({type: 'strong', children: []})
      }, /void should not have `children`: `{ type: 'strong', children: \[] }`$/)
    }
  )

  await t.test('should not throw on valid void nodes', async function () {
    assert.doesNotThrow(function () {
      _void({type: 'break'})
    })
  })
})
