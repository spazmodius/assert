'use strict'

const nativeAssert = require('assert')
const _assert = nativeAssert.strict || nativeAssert
function noop() {}

let assert, methods

if (process.env.no_assert || process.env.node_env === 'production') {
	assert = noop
	methods = {
		deepEqual: noop,
		equal: noop,
		fail: noop,
		notDeepEqual: noop,
		notEqual: noop,
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
