'use strict'

class AssertThat {
	constructor(assert, fn, args) {
		this.assert = assert
		this.actual = fn.bind(null, ...args)
	}

	ok(...args) { 
		this.assert.ok(this.actual(), ...args) 
	}

	equal(...args) {
		this.assert.equal(this.actual(), ...args)
	}

	notEqual(...args) {
		this.assert.notEqual(this.actual(), ...args)
	}

	deepEqual(...args) {
		this.assert.deepEqual(this.actual(), ...args)
	}

	notDeepEqual(...args) {
		this.assert.notDeepEqual(this.actual(), ...args)
	}

	throws(...args) {
		this.assert.throws(this.actual, ...args)
	}

	doesNotThrow(...args) {
		this.assert.doesNotThrow(this.actual, ...args)
	}
}

module.exports = AssertThat
