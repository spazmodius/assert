'use strict'

const nativeAssert = require('assert')
const _assert = nativeAssert.strict || nativeAssert

let assert, methods

if (process.env.no_assert || process.env.node_env === 'production') {
	assert = function noop() {}
	methods = {
		deepEqual: assert,
		equal: assert,
		fail: assert,
		notDeepEqual: assert,
		notEqual: assert,
	}
}
else {
	assert = _assert.bind()
	methods = {
		deepEqual: _assert.deepStrictEqual,
		equal: _assert.strictEqual,
		fail: _assert.fail,
		notDeepEqual: _assert.notDeepStrictEqual,
		notEqual: _assert.notStrictEqual,
	}
}

assert.AssertionError = _assert.AssertionError
module.exports = Object.assign(assert, methods)
