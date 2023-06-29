import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from 'unist-util-assert'

test('non-defined', async function (t) {
  await t.test(
    'should not throw if non-defined properties are found',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({
          type: 'element',
          properties: {
            className: ['alpha'],
            id: 'bravo'
          },
          children: [],
          position: {},
          data: {
            charlie: 'delta'
          }
        })
      })
    }
  )

  await t.test(
    'should throw if non-defined properties are not serialisable',
    async function () {
      nodeAssert.throws(function () {
        assert({
          type: 'break',
          data: {foo: Function}
        })
      }, /non-specced property `data` should be JSON: `{ type: 'break', data: { foo: \[Function: Function] } }`$/)
    }
  )
})
