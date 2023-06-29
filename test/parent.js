import assert from 'node:assert/strict'
import test from 'node:test'
import {parent} from 'unist-util-assert'

test('parent()', async function (t) {
  await t.test('should throw the same errors as `assert()`', async function () {
    assert.throws(function () {
      parent({})
    }, /node should have a type: `{}`$/)
  })

  await t.test(
    'should throw if the given node has a `value`',
    async function () {
      assert.throws(function () {
        parent({type: 'text', value: 'foo'})
      }, /parent should not have `value`: `{ type: 'text', value: 'foo' }`$/)
    }
  )

  await t.test(
    'should throw if the given node has `children`',
    async function () {
      assert.throws(function () {
        parent({type: 'break'})
      }, /parent should have `children`: `{ type: 'break' }`$/)
    }
  )

  await t.test('should not throw on valid void nodes', async function () {
    assert.doesNotThrow(function () {
      parent({type: 'strong', children: []})
    })
  })
})
