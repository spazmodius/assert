'use strict'

class AssertThat {
	constructor(assert, fn, args) {
		this.assert = assert
		this.actual = fn.bind(null, ...args)
	}

	ok(...args) {
		return this.assert.ok(this.actual(), ...args)
	}

	equal(...args) {
		return this.assert.equal(this.actual(), ...args)
	}

	notEqual(...args) {
		return this.assert.notEqual(this.actual(), ...args)
	}

	deepEqual(...args) {
		return this.assert.deepEqual(this.actual(), ...args)
	}

	notDeepEqual(...args) {
		return this.assert.notDeepEqual(this.actual(), ...args)
	}

	throws(...args) {
		return this.assert.throws(this.actual, ...args)
	}

	doesNotThrow(...args) {
		return this.assert.doesNotThrow(this.actual, ...args)
	}
}

function that(fn, ...args) {
	return new AssertThat(this, fn, args)
}

function register_that(name) {
	AssertThat.prototype[name] = function registered(...args) {
		this.assert[name](this.actual(), ...args)
	}
}

module.exports = {
	that,
	register_that,
}
