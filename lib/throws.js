'use strict'
const format = require('./format')

module.exports = function(_throws) {
	return function throws(fn, expected, message, ...info) {
		if (typeof expected === 'string') {
			info.unshift(message)
			message = expected
			expected = undefined
		}
		try {
			_throws(fn, expected, message)
		} catch(e) {
			e.message += format(info)
			throw e
		}
	}
}