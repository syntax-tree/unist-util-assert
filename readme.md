# unist-util-assert

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**unist**][unist] utility to assert trees.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install unist-util-assert
```

## Use

```js
import {assert, parent, _void} from 'unist-util-assert'

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

This package exports the following identifiers: `assert`, `parent`, `literal`,
`_void`, `wrap`.
There is no default export.

### `assert(node[, parent])`

Assert that `node` is a valid [unist][] [node][].
If `node` is a [parent][], all [child][]ren will be asserted too.

### `parent(node[, parent])`

Assert that `node` is a valid [unist][] [parent][].
All [child][]ren will be asserted too.

### `literal(node[, parent])`

Assert that `node` is a valid [unist][] [literal][].

### `_void(node[, parent])`

Assert that `node` is a valid [unist][] [node][], but neither [parent][] nor
[literal][].

## Extensions

This module can be used as a base to test subsets of [unist][] (for an example,
see [`mdast-util-assert`][mdast-util-assert]).
All functions that are exposed from such a module, and functions used internally
to test [child][]ren, should be wrapped in `wrap`, which adds an inspectable
string of the respective node, and its parent when available, to the exposed
error message.

### `wrap(fn)`

Wraps `fn` (which is passed a node, and an optional parent node), so that any
errors thrown inside it will contain information regarding the node (and the
parent, when given).

## Related

*   [`mdast-util-assert`][mdast-util-assert]
    — Check [mdast](https://github.com/syntax-tree/mdast) nodes
*   [`hast-util-assert`](https://github.com/syntax-tree/hast-util-assert)
    — Check [hast](https://github.com/syntax-tree/hast) nodes
*   [`nlcst-test`](https://github.com/syntax-tree/nlcst-test)
    — Check [nlcst](https://github.com/syntax-tree/nlcst) nodes

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
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

[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-assert.svg

[size]: https://bundlephobia.com/result?p=unist-util-assert

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md

[unist]: https://github.com/syntax-tree/unist

[parent]: https://github.com/syntax-tree/unist#parent

[literal]: https://github.com/syntax-tree/unist#literal

[node]: https://github.com/syntax-tree/unist#node

[child]: https://github.com/syntax-tree/unist#child

[mdast-util-assert]: https://github.com/syntax-tree/mdast-util-assert
