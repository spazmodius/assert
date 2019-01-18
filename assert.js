'use strict'
const AssertThat = require('./lib/that')
const assertions = require('./lib/assertions')

function noop() {}
for (const method of Object.keys(assertions))
	Object.defineProperty(noop, method, { value: noop, enumerable: true })
Object.defineProperties(noop, {
	that: { value: () => noop, enumerable: false },
})

const assert = Object.assign(assertions.ok, assertions)
Object.defineProperties(assert, {
	that: { value: (fn, ...args) => new AssertThat(assert, fn, args), enumerable: false },
})

const production = process.env.no_assert || process.env.node_env === 'production'
module.exports = production? noop: assert
