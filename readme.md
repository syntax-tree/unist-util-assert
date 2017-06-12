# unist-util-assert [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Assert [Unist][] nodes.

## Installation

[npm][]:

```bash
npm install unist-util-assert
```

## Usage

```javascript
var assert = require('unist-util-assert');

assert({type: 'root', children: []});
assert({type: 'break'});
assert({type: 'element', properties: {}, children: []});
// All OK.

assert({children: []});
// AssertionError: node should have a type: `{ children: [] }`

assert.parent({type: 'break'});
// AssertionError: parent should have `children`: `{ type: 'break' }`

assert({type: 'element', properties: function () {}});
// AssertionError: non-specced property `properties` should be JSON: `{ type: 'element', properties: [Function] }`

assert.void({type: 'text', value: 'Alpha'});
// AssertionError: void should not have `value`: `{ type: 'text', value: 'Alpha' }`

assert({type: 'paragraph', children: ['foo']});
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

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/syntax-tree/unist-util-assert.svg

[travis]: https://travis-ci.org/syntax-tree/unist-util-assert

[codecov-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-assert.svg

[codecov]: https://codecov.io/github/syntax-tree/unist-util-assert

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[unist]: https://github.com/syntax-tree/unist

[parent]: https://github.com/syntax-tree/unist#parent

[text]: https://github.com/syntax-tree/unist#text

[mdast-util-assert]: https://github.com/syntax-tree/mdast-util-assert
