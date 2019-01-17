'use strict'
const _assert = require('assert').strict || require('assert')
const AssertThat = require('./that')

const methods = [
	'ok',
	'fail',
	'deepEqual',
	'equal',
	'notDeepEqual',
	'notEqual',
	'throws',
	'doesNotThrow',
]

function noop() {}
Object.defineProperties(noop, {
	AssertionError: { value: _assert.AssertionError, enumerable: true },
	that: { value: () => noop, enumerable: true },
})
for (const method of methods)
	Object.defineProperty(noop, method, { value: noop, enumerable: true })

const assert = _assert.bind()
Object.defineProperties(assert, {
	AssertionError: { value: _assert.AssertionError, enumerable: true },
	that: { value: (fn, ...args) => new AssertThat(assert, fn, args), enumerable: true },
})
for (const method of methods)
	Object.defineProperty(assert, method, { value: _assert[method], enumerable: true })

const production = process.env.no_assert || process.env.node_env === 'production'
module.exports = production? noop: assert
