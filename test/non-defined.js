import test from 'tape'
import {assert} from '../index.js'

test('non-defined', (t) => {
  t.doesNotThrow(() => {
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

  t.throws(
    () => {
      assert({
        type: 'break',
        data: {foo: Function}
      })
    },
    /non-specced property `data` should be JSON: `{ type: 'break', data: { foo: \[Function: Function] } }`$/,
    'should throw if non-defined properties are not serialisable'
  )

  t.end()
})
