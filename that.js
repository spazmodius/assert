'use strict'
const _assert = require('./native-assert')

class AssertThat {
	constructor(fn, args) {
		this.actual = fn.bind(null, ...args)
	}

	ok(...args) { 
		_assert.ok(this.actual(), ...args) 
	}

	equal(...args) {
		_assert.equal(this.actual(), ...args)
	}

	notEqual(...args) {
		_assert.notEqual(this.actual(), ...args)
	}

	deepEqual(...args) {
		_assert.deepEqual(this.actual(), ...args)
	}

	notDeepEqual(...args) {
		_assert.notDeepEqual(this.actual(), ...args)
	}

	throws(...args) {
		_assert.throws(this.actual, ...args)
	}

	doesNotThrow(...args) {
		_assert.doesNotThrow(this.actual, ...args)
	}
}

module.exports = AssertThat
