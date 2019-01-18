'use strict'
const _assert = require('assert').strict || require('assert')
const AssertThat = require('./that')

const methods = [
	'ok',
	'fail',
	'equal',
	'notEqual',
	'deepEqual',
	'notDeepEqual',
	'throws',
	'doesNotThrow',
]

function noop() {}
Object.defineProperties(noop, {
	that: { value: () => noop, enumerable: true },
})
for (const method of methods)
	Object.defineProperty(noop, method, { value: noop, enumerable: true })

const ok = require('./lib/ok')(_assert.ok)
const fail = require('./lib/fail')(_assert.fail)
const equal = require('./lib/equal')(_assert.equal)
const notEqual = require('./lib/notEqual')(_assert.notEqual)
const deepEqual = require('./lib/deepEqual')(_assert.deepEqual)
const notDeepEqual = require('./lib/notDeepEqual')(_assert.notDeepEqual)
const throws = require('./lib/throws')(_assert.throws)
const doesNotThrow = require('./lib/doesNotThrow')(_assert.doesNotThrow)

// const assert = _assert.bind()
const assert = ok
Object.defineProperties(assert, {
	that: { value: (fn, ...args) => new AssertThat(assert, fn, args), enumerable: true },
	ok: { value: ok, enumerable: true },
	fail: { value: fail, enumerable: true },
	equal: { value: equal, enumerable: true },
	notEqual: { value: notEqual, enumerable: true },
	deepEqual: { value: deepEqual, enumerable: true },
	notDeepEqual: { value: notDeepEqual, enumerable: true },
	throws: { value: throws, enumerable: true },
	doesNotThrow: { value: doesNotThrow, enumerable: true },
})
for (let method of methods) {
	if (assert[method]) continue
	const strictMethod = method.replace(/Equal/, 'StrictEqual').replace(/equal/, 'strictEqual')
	let impl = _assert[strictMethod] || _assert[method]
	Object.defineProperty(assert, method, { value: impl, enumerable: true })
}



const production = process.env.no_assert || process.env.node_env === 'production'
module.exports = production? noop: assert
