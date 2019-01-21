'use strict'
const augment = require('./augment')

module.exports = function(_doesNotThrow) {
	return function doesNotThrow(fn, expected, message, ...info) {
		if (typeof expected === 'string') {
			info.unshift(message)
			message = expected
			expected = undefined
		}
		try {
			_doesNotThrow(fn, expected, message)
		} catch(e) {
			throw augment(e, info)
		}
	}
}