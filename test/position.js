import nodeAssert from 'node:assert/strict'
import test from 'node:test'
import {assert} from 'unist-util-assert'

test('position', async function (t) {
  await t.test(
    'should throw if given a non-object `position`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'foo', position: 1})
      }, /`position` should be an object: `{ type: 'foo', position: 1 }`$/)
    }
  )

  await t.test(
    'should not throw if given a null `position`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', position: null})
      })
    }
  )

  await t.test(
    'should not throw if given an empty `position` object',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', position: {}})
      })
    }
  )

  await t.test(
    'should throw if given a non-object `position.start`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'foo', position: {start: 1}})
      }, /`position.start` should be an object: `{ type: 'foo', position: { start: 1 } }`$/)
    }
  )

  await t.test(
    'should not throw if given a null `position.start`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', position: {start: null}})
      })
    }
  )

  await t.test(
    'should not throw if given an empty `position.start` object',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', position: {start: {}}})
      })
    }
  )

  await t.test(
    'should throw if given a non-object `position.end`',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'foo', position: {end: 1}})
      }, /`position.end` should be an object: `{ type: 'foo', position: { end: 1 } }`$/)
    }
  )

  await t.test(
    'should not throw if given a null `position.end`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', position: {end: null}})
      })
    }
  )

  await t.test(
    'should not throw if given an empty `position.end` object',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', position: {end: {}}})
      })
    }
  )

  await t.test(
    'should not throw if given a `position.start.line` to `null`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', position: {start: {line: null}}})
      })
    }
  )

  await t.test(
    'should not throw if given a `position.start.column` to `null`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', position: {start: {column: null}}})
      })
    }
  )

  await t.test(
    'should not throw if given a `position.end.line` to `null`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', position: {end: {line: null}}})
      })
    }
  )

  await t.test(
    'should not throw if given a `position.end.column` to `null`',
    async function () {
      nodeAssert.doesNotThrow(function () {
        assert({type: 'foo', position: {end: {column: null}}})
      })
    }
  )

  await t.test(
    'should throw if `position.start.line` is less than 1',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'foo', position: {start: {line: 0}}})
      }, /`position.start.line` should be gte `1`: `{ type: 'foo', position: { start: { line: 0 } } }`$/)
    }
  )

  await t.test(
    'should throw if `position.start.column` is less than 1',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'foo', position: {start: {column: 0}}})
      }, /`position.start.column` should be gte `1`: `{ type: 'foo', position: { start: { column: 0 } } }`$/)
    }
  )

  await t.test(
    'should throw if `position.end.line` is less than 1',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'foo', position: {end: {line: 0}}})
      }, /`position.end.line` should be gte `1`: `{ type: 'foo', position: { end: { line: 0 } } }`$/)
    }
  )

  await t.test(
    'should throw if `position.end.column` is less than 1',
    async function () {
      nodeAssert.throws(function () {
        assert({type: 'foo', position: {end: {column: 0}}})
      }, /`position.end.column` should be gte `1`: `{ type: 'foo', position: { end: { column: 0 } } }`$/)
    }
  )
})
