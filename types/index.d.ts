// TypeScript Version: 3.7

import {Node, Parent, Literal} from 'unist'

declare namespace unistUtilAssert {
  interface VoidNode extends Node {
    children: never
    value: never
  }

  function parent(tree: unknown): asserts tree is Parent

  function text(tree: unknown): asserts tree is Literal

  // FIXME: void is a reserved functio name in TS
  // find a way that void can be included in the typing without errors
  // function void(tree: unknown): asserts tree is VoidNode
}

declare function unistUtilAssert(
  tree: unknown
): asserts tree is Node

export = unistUtilAssert
