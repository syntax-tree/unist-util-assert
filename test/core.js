import assert from 'node:assert/strict'
import test from 'node:test'

test('assert', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('../index.js')).sort(), [
      '_void',
      'assert',
      'literal',
      'parent',
      'wrap'
    ])
  })
})
