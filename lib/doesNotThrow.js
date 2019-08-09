'use strict'
const augment = require('./augment')

module.exports = function(_doesNotThrow) {
	return function doesNotThrow(fn, expected, message, ...info) {
		if (typeof expected === 'string') {
			if (arguments.length > 2)
				info.unshift(message)
			message = expected
			expected = undefined
		}
		try {
			_doesNotThrow(fn, expected, message)
			return true
		} catch(e) {
			throw augment(e, info)
		}
	}
}