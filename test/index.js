/* eslint-disable import/no-unassigned-import */
import './node.js'
import './type.js'
import './value.js'
import './children.js'
import './position.js'
import './non-defined.js'
import './parent.js'
import './literal.js'
import './void.js'
/* eslint-enable import/no-unassigned-import */

import assert from 'node:assert/strict'
import test from 'node:test'
import * as mod from '../index.js'

test('assert', () => {
  assert.deepEqual(
    Object.keys(mod).sort(),
    ['_void', 'assert', 'literal', 'parent', 'wrap'],
    'should expose the public api'
  )
})
