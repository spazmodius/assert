'use strict'
const augment = require('./augment')

module.exports = function(_throws) {
	return function throws(fn, expected, message, ...info) {
		if (typeof expected === 'string') {
			if (arguments.length > 2)
				info.unshift(message)
			message = expected
			expected = undefined
		}
		try {
			_throws(fn, expected, message)
		} catch(e) {
			throw augment(e, info)
		}
	}
}