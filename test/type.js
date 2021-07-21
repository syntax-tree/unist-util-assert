import test from 'tape'
import {assert} from '../index.js'

test('type', (t) => {
  t.throws(
    () => {
      assert({})
    },
    /node should have a type: `{}`$/,
    'should throw if not given a `type` (#1)'
  )

  t.throws(
    () => {
      assert({value: 'foo'})
    },
    /node should have a type: `{ value: 'foo' }`$/,
    'should throw if not given a type (#2)'
  )

  t.throws(
    () => {
      assert({type: 1})
    },
    /`type` should be a string: `{ type: 1 }`$/,
    'should throw if not given a non-string type'
  )

  t.throws(
    () => {
      assert({type: ''})
    },
    /`type` should not be empty: `{ type: '' }`$/,
    'should throw if given an empty string type'
  )

  t.doesNotThrow(() => {
    assert({type: 'foo'})
  }, 'should not throw if given a non-empty type string')

  t.end()
})
