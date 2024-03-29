# unist-util-assert

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[unist][] utility to assert trees.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`assert(tree[, parent])`](#asserttree-parent)
    *   [`parent(tree[, parent])`](#parenttree-parent)
    *   [`literal(node[, parent])`](#literalnode-parent)
    *   [`_void(node[, parent])`](#_voidnode-parent)
    *   [`wrap(fn)`](#wrapfn)
    *   [`AssertionError`](#assertionerror)
*   [Extensions](#extensions)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a tiny utility that helps you deal with nodes.

## When should I use this?

This utility is typically useful when you expect certain nodes in your APIs
and want to make sure they’re valid and as expected.

Different utilities, [`mdast-util-assert`][mdast-util-assert],
[`hast-util-assert`][hast-util-assert], and [`nlcst-test`][nlcst-test],
do the same but for mdast, hast, and nlcst nodes, respectively.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install unist-util-assert
```

In Deno with [`esm.sh`][esmsh]:

```js
import {assert} from 'https://esm.sh/unist-util-assert@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {assert} from 'https://esm.sh/unist-util-assert@4?bundle'
</script>
```

## Use

```js
import {_void, assert, parent} from 'unist-util-assert'

assert({type: 'root', children: []})
assert({type: 'break'})
assert({type: 'element', properties: {}, children: []})
// All OK.

assert({children: []})
// AssertionError: node should have a type: `{ children: [] }`

parent({type: 'break'})
// AssertionError: parent should have `children`: `{ type: 'break' }`

assert({type: 'element', properties: function() {}})
// AssertionError: non-specced property `properties` should be JSON: `{ type: 'element', properties: [Function] }`

_void({type: 'text', value: 'Alpha'})
// AssertionError: void should not have `value`: `{ type: 'text', value: 'Alpha' }`

assert({type: 'paragraph', children: ['foo']})
// AssertionError: node should be an object: `'foo'` in `{ type: 'paragraph', children: [ 'foo' ] }`
```

## API

This package exports the identifiers [`_void`][void], [`assert`][assert],
[`literal`][literal], [`parent`][parent], and [`wrap`][wrap].
There is no default export.

### `assert(tree[, parent])`

Assert that `tree` is a valid unist [`Node`][node].

If `tree` is a parent, all children will be asserted too.

###### Parameters

*   `tree` (`unknown`)
    — thing to assert
*   `parent` ([`Parent`][parent-node], optional)
    — optional, valid parent

###### Returns

Nothing.

###### Throws

When `tree` (or its descendants) is not a node.

### `parent(tree[, parent])`

Assert that `tree` is a valid unist [`Parent`][parent-node].

All children will be asserted too.

###### Parameters

*   `tree` (`unknown`)
    — thing to assert
*   `parent` ([`Parent`][parent-node], optional)
    — optional, valid parent

###### Returns

Nothing.

###### Throws

When `tree` is not a parent or its descendants are not nodes.

### `literal(node[, parent])`

Assert that `node` is a valid unist [`Literal`][literal-node].

###### Parameters

*   `tree` (`unknown`)
    — thing to assert
*   `parent` ([`Parent`][parent-node], optional)
    — optional, valid parent

###### Returns

Nothing.

###### Throws

When `node` is not a literal.

### `_void(node[, parent])`

Assert that `node` is a valid void node.

###### Parameters

*   `tree` (`unknown`)
    — thing to assert
*   `parent` ([`Parent`][parent-node], optional)
    — optional, valid parent

###### Returns

Nothing.

###### Throws

When `node` is not a node, a parent, or a literal.

### `wrap(fn)`

Wrapper that adds the current node (and parent, if available) to error
messages.

###### Parameters

*   `fn` (`(node?: any, parent?: Parent | null | undefined) => asserts node is Node)`)
    — custom assertion

###### Returns

Wrapped `fn`.

### `AssertionError`

Assertion error from `node:assert` (TypeScript type).

###### Type

```ts
type AssertionError = import('node:assert').AssertionError
```

## Extensions

This module can be used as a base to test subsets of unist (for an example, see
[`mdast-util-assert`][mdast-util-assert]).
All functions that are exposed from such a module, and functions used internally
to test children, should be wrapped in `wrap`, which adds an inspectable string
of the respective node, and its parent when available, to the exposed error
message.

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`AssertionError`][assertionerror].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `unist-util-assert@^4`,
compatible with Node.js 16.

## Related

*   [`mdast-util-assert`][mdast-util-assert]
    — assert mdast nodes
*   [`hast-util-assert`](https://github.com/syntax-tree/hast-util-assert)
    — assert hast nodes
*   [`nlcst-test`](https://github.com/syntax-tree/nlcst-test)
    — assert nlcst nodes

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/unist-util-assert/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/unist-util-assert/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-assert.svg

[coverage]: https://codecov.io/github/syntax-tree/unist-util-assert

[downloads-badge]: https://img.shields.io/npm/dm/unist-util-assert.svg

[downloads]: https://www.npmjs.com/package/unist-util-assert

[size-badge]: https://img.shields.io/badge/dynamic/json?label=minzipped%20size&query=$.size.compressedSize&url=https://deno.bundlejs.com/?q=unist-util-assert

[size]: https://bundlejs.com/?q=unist-util-assert

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[parent-node]: https://github.com/syntax-tree/unist#parent

[literal-node]: https://github.com/syntax-tree/unist#literal

[mdast-util-assert]: https://github.com/syntax-tree/mdast-util-assert

[hast-util-assert]: https://github.com/syntax-tree/hast-util-assert

[nlcst-test]: https://github.com/syntax-tree/nlcst-test

[assert]: #asserttree-parent

[parent]: #parenttree-parent

[literal]: #literalnode-parent

[void]: #_voidnode-parent

[wrap]: #wrapfn

[assertionerror]: #assertionerror
