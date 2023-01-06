import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from '../index.js'

test('children', () => {
  nodeAssert.throws(
    () => {
      assert({type: 'foo', children: {alpha: 'bravo'}})
    },
    /`children` should be an array: `{ type: 'foo', children: { alpha: 'bravo' } }`$/,
    'should throw if given a non-node child in children'
  )

  nodeAssert.throws(
    () => {
      assert({type: 'foo', children: ['one']})
    },
    /node should be an object: `'one'` in `{ type: 'foo', children: \[ 'one' ] }`$/,
    'should throw if given a non-node child in children'
  )

  nodeAssert.doesNotThrow(() => {
    assert({type: 'parent', children: [{type: 'text', value: 'alpha'}]})
  }, 'should not throw on vald children')

  nodeAssert.throws(
    () => {
      assert({
        type: 'foo',
        children: [
          {
            type: 'bar',
            children: ['one']
          }
        ]
      })
    },
    /node should be an object: `'one'` in `{ type: 'bar', children: \[ 'one' ] }`$/,
    'should throw on invalid descendants'
  )
})
