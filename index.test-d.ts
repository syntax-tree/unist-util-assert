import {expectNotType, expectType} from 'tsd'
import type {Node, Parent} from 'unist'
import {assert, parent} from 'unist-util-assert'

const emptyNode = {type: 'a'}
const literalNode = {type: 'b', value: 'c'}
const parentNode = {type: 'd', children: [emptyNode, literalNode]}

expectNotType<Node>(emptyNode)
expectNotType<Node>(literalNode)
expectNotType<Node>(parentNode)

assert(emptyNode)
expectType<Node>(emptyNode)

expectNotType<Parent>(parentNode)
parent(parentNode)
expectType<Parent>(parentNode)
