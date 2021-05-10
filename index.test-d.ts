import {expectType, expectNotType} from 'tsd'
import {Node, Parent} from 'unist'
import {assert, parent} from './index.js'

var emptyNode = {type: 'a'}
var literalNode = {type: 'b', value: 'c'}
var parentNode = {type: 'd', children: [emptyNode, literalNode]}

expectNotType<Node>(emptyNode)
expectNotType<Node>(literalNode)
expectNotType<Node>(parentNode)

assert(emptyNode)
expectType<Node>(emptyNode)

expectNotType<Parent>(parentNode)
parent(parentNode)
expectType<Parent>(parentNode)
