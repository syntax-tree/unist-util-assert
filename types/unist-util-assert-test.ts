import {Node, Parent, Literal} from 'unist'
import unified = require('unified')
import assert = require('unist-util-assert')

function testAssert() {
  const node = {}
  assert(node)
  node
}
