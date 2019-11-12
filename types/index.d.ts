// TypeScript Version: 3.7

import {Node, Parent, Literal} from 'unist'

declare namespace unistUtilAssert {
  /**
   * A unist Node that is neither a Parent nor a Literal.
   */
  interface VoidNode extends Node {
    children: never
    value: never
  }
}

declare const unistUtilAssert: {
  /**
   * Assert that tree is a valid unist node.
   * If tree is a parent, all children will be asserted as well.
   */
  (tree: unknown): asserts tree is Node

  /**
   * Assert that tree is a valid unist parent.
   * All children will be asserted as well.
   */
  parent(tree: unknown): asserts tree is Parent

  /**
   * Assert that node is a valid unist literal.
   */
  text(tree: unknown): asserts tree is Literal

  /**
   * Assert that node is a valid unist node, but neither parent nor literal.
   */
  void(tree: unknown): asserts tree is unistUtilAssert.VoidNode
}

export = unistUtilAssert
