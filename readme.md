# unist-util-assert

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

Assert [Unist][] nodes.

## Installation

[npm][]:

```bash
npm install unist-util-assert
```

## Usage

```javascript
var assert = require('unist-util-assert')

assert({type: 'root', children: []})
assert({type: 'break'})
assert({type: 'element', properties: {}, children: []})
// All OK.

assert({children: []})
// AssertionError: node should have a type: `{ children: [] }`

assert.parent({type: 'break'})
// AssertionError: parent should have `children`: `{ type: 'break' }`

assert({type: 'element', properties: function() {}})
// AssertionError: non-specced property `properties` should be JSON: `{ type: 'element', properties: [Function] }`

assert.void({type: 'text', value: 'Alpha'})
// AssertionError: void should not have `value`: `{ type: 'text', value: 'Alpha' }`

assert({type: 'paragraph', children: ['foo']})
// AssertionError: node should be an object: `'foo'` in `{ type: 'paragraph', children: [ 'foo' ] }`
```

## API

### `assert(node)`

Assert that `node` is a valid [Unist][] node.  If `node` has `children`,
all children will be asserted as well.

### `assert.parent(node)`

Assert that `node` is a valid Unist [Parent][].

### `assert.text(node)`

Assert that `node` is a valid Unist [Text][].

### `assert.void(node)`

Assert that `node` is a valid Unist node, but neither Text nor Parent.

## Extensions

This module can be used as a base to test subsets of Unist (for an
example, see [`mdast-util-assert`][mdast-util-assert]).  All functions
which are exposed from such a module, and functions used internally to
test child nodes, should be wrapped in `assert.wrap`, which adds an
inspectable string of the respective node, and its parent when available,
to exposed error message.

### `assert.wrap(fn)`

Wraps a function (which is passed a node, and an optional parent node),
so that any errors thrown inside it will contain information regarding
the node (and the parent, when given).

## Related

*   [`mdast-util-assert`](https://github.com/syntax-tree/mdast-util-assert)
    — Check [mdast](https://github.com/syntax-tree/mdast) nodes
*   [`hast-util-assert`](https://github.com/syntax-tree/hast-util-assert)
    — Check [hast](https://github.com/syntax-tree/hast) nodes
*   [`nlcst-test`](https://github.com/syntax-tree/nlcst-test)
    — Check [nlcst](https://github.com/syntax-tree/nlcst) nodes

## Contribute

See [`contributing.md` in `syntax-tree/unist`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/unist-util-assert.svg

[build]: https://travis-ci.org/syntax-tree/unist-util-assert

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-assert.svg

[coverage]: https://codecov.io/github/syntax-tree/unist-util-assert

[downloads-badge]: https://img.shields.io/npm/dm/unist-util-assert.svg

[downloads]: https://www.npmjs.com/package/unist-util-assert

[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-assert.svg

[size]: https://bundlephobia.com/result?p=unist-util-assert

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/syntax-tree

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[unist]: https://github.com/syntax-tree/unist

[parent]: https://github.com/syntax-tree/unist#parent

[text]: https://github.com/syntax-tree/unist#text

[mdast-util-assert]: https://github.com/syntax-tree/mdast-util-assert

[contributing]: https://github.com/syntax-tree/unist/blob/master/contributing.md

[coc]: https://github.com/syntax-tree/unist/blob/master/code-of-conduct.md
