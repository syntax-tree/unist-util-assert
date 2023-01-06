import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('non-defined', () => {
  nodeAssert.doesNotThrow(() => {
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
  }, 'should not throw if non-defined properties are found')

  nodeAssert.throws(
    () => {
      assert({
        type: 'break',
        data: {foo: Function}
      })
    },
    /non-specced property `data` should be JSON: `{ type: 'break', data: { foo: \[Function: Function] } }`$/,
    'should throw if non-defined properties are not serialisable'
  )
})
