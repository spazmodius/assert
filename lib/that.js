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

function that(fn, ...args) {
	return new AssertThat(this, fn, args)
}

function that_noop() { return this }

function register_that(name) {
	AssertThat.prototype[name] = function registered(...args) {
		this.assert[name](this.actual(), ...args)
	}
}

module.exports = {
	that,
	that_noop,
	register_that,
}
