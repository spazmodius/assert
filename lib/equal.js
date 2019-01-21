'use strict'
const augment = require('./augment')

module.exports = function(_equal) {
	return function equal(actual, expected, message, ...info) {
		try {
			_equal(actual, expected, message)
		} catch(e) {
			throw augment(e, info)
		}
	}
}