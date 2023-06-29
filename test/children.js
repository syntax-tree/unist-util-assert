import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from 'unist-util-assert'

test('children', async function (t) {
  await t.test(
    'should throw if given a non-node child in children',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'foo', children: {alpha: 'bravo'}})
      }, /`children` should be an array: `{ type: 'foo', children: { alpha: 'bravo' } }`$/)
    }
  )

  await t.test(
    'should throw if given a non-node child in children',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'foo', children: ['one']})
      }, /node should be an object: `'one'` in `{ type: 'foo', children: \[ 'one' ] }`$/)
    }
  )

  await t.test('should not throw on vald children', async function () {
    nodeAssert.doesNotThrow(function () {
      assert({type: 'parent', children: [{type: 'text', value: 'alpha'}]})
    })
  })

  await t.test('should throw on invalid descendants', async function () {
    nodeAssert.throws(function () {
      assert({
        type: 'foo',
        children: [
          {
            type: 'bar',
            children: ['one']
          }
        ]
      })
    }, /node should be an object: `'one'` in `{ type: 'bar', children: \[ 'one' ] }`$/)
  })
})
