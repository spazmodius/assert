'use strict'
const augment = require('./augment')

module.exports = function(_equal) {
	return function equal(actual, expected, message, ...info) {
		// we want to use the standard default message
		// which includes a nice diff
		try {
			_equal(actual, expected, message)
			return true
		} catch(e) {
			throw augment(e, info)
		}
	}
}