'use strict'
const augment = require('./augment')

module.exports = function(_deepEqual) {
	return function deepEqual(actual, expected, message, ...info) {
		// we want to use the standard default message
		// which includes a nice diff
		try {
			_deepEqual(actual, expected, message)
		} catch(e) {
			throw augment(e, info)
		}
	}
}