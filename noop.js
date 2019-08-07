'use strict'
const assertions = require('./lib/assertions')

function noop() {}

for (const method of Object.keys(assertions))
	Object.defineProperty(noop, method, { value: noop, enumerable: true })

function that_noop() { return this }

function register_noop(name, predicate) {
	if (typeof name === 'function') {
		predicate = name
		name = undefined
	}

	if (name === undefined)
		name = predicate.name

	if (!name || typeof name !== 'string')
		throw new TypeError('`name` is invalid')

	this[name] = this
	return this
}

Object.defineProperties(noop, {
	that: { value: that_noop, enumerable: false },
	register: { value: register_noop, enumerable: false },
})

module.exports = noop
