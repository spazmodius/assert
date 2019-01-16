'use strict'

const nativeAssert = require('assert')
const _assert = nativeAssert.strict || nativeAssert

const methods = [
	'deepEqual',
	'equal',
	'fail',
	'notDeepEqual',
	'notEqual',
]

function defineMethods(obj, getValue) {
	methods
		.map(name => ({ name, def: { value: getValue(name), enumerable: true } }))
		.forEach(({ name, def }) => Object.defineProperty(obj, name, def))
}

function noop() {}
defineMethods(noop, () => noop)
noop.AssertionError = _assert.AssertionError

const assert = _assert.bind()
defineMethods(assert, name => _assert[name])
assert.AssertionError = _assert.AssertionError

const production = process.env.no_assert || process.env.node_env === 'production'

module.exports = production? noop: assert
