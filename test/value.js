'use strict'

var test = require('tape')
var assert = require('..')

test('value', function(t) {
  t.throws(
    function() {
      assert({type: 'foo', value: 1})
    },
    /`value` should be a string: `{ type: 'foo', value: 1 }`$/,
    'should throw if given a non-string `value`'
  )

  t.doesNotThrow(function() {
    assert({type: 'foo', value: ''})
  }, 'should not throw if given an empty string `value`')

  t.doesNotThrow(function() {
    assert({type: 'foo', value: 'foo'})
  }, 'should not throw if given an string `value`')

  t.doesNotThrow(function() {
    assert({type: 'foo', value: undefined})
  }, 'should not throw if given an undefined `value`')

  t.doesNotThrow(function() {
    assert({type: 'foo', value: null})
  }, 'should not throw if given an null `value`')

  t.end()
})
