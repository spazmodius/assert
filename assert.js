'use strict'
const assertions = require('./lib/assertions')
const { that, that_noop } = require('./lib/that')
const { register, register_noop } = require('./lib/register')

function noop() {}
for (const method of Object.keys(assertions))
	Object.defineProperty(noop, method, { value: noop, enumerable: true })
Object.defineProperties(noop, {
	that: { value: that_noop, enumerable: false },
	register: { value: register_noop, enumerable: false },
})

const assert = Object.assign(assertions.ok, assertions)
Object.defineProperties(assert, {
	that: { value: that, enumerable: false },
	register: { value: register, enumerable: false },
})

const production = process.env.no_assert || process.env.node_env === 'production'
module.exports = production? noop: assert
