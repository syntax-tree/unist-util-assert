import * as assert from 'unist-util-assert'

function testAssert() {
  const node = {}
  assert(node)
  node // $ExpectType Node
}

function testParentAssert() {
  const node = {}
  assert.parent(node)
  node // $ExpectType Parent
}

function testTextAssert() {
  const node = {}
  assert.text(node)
  node // $ExpectType Literal
}

function testVoidAssert() {
  const node = {}
  assert.void(node)
  node // $ExpectType Void
}
