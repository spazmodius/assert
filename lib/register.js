'use strict'
const { AssertionError } = require('assert')
const augment = require('./augment')
const { register_that } = require('./that')

function returns(constant) {
	return () => constant
}

function register(name, predicate, defaultMessage) {
	if (typeof name === 'function') {
		defaultMessage = predicate
		predicate = name
		name = undefined
	}

	if (name === undefined)
		name = predicate.name

	if (!name || typeof name !== 'string')
		throw new TypeError('`name` is invalid')
	if (!predicate || typeof predicate !== 'function')
		throw new TypeError('`predicate` is required Function')

	if (typeof defaultMessage !== 'function') {
		if (defaultMessage !== undefined && typeof defaultMessage !== 'string')
			throw new TypeError('`defaultMessage` must be a String or Function')
		defaultMessage = returns(defaultMessage)
	}

	this[name] = buildAssertion(name, predicate, defaultMessage)
	register_that(name)
	return this
}

function buildAssertion(name, predicate, defaultMessage) {
	function registered(...args) {
		return assertion(...separate(predicate.length, args))
	}

	function assertion(fixed, message, info) {
		if (!predicate(...fixed)) {
			if (message === undefined)
				message = defaultMessage(...fixed)
			const err = new AssertionError({
				actual: fixed[0],
				expected: fixed[1],
				message,
				operator: name,
				stackStartFn: registered
			})
			throw augment(err, info)
		}
	}

	return registered
}

function separate(required, args) {
	return [
		args.slice(0, required),
		args[required],
		args.slice(required + 1),
	]
}

module.exports = {
	register,
}
