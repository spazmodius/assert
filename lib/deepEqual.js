'use strict'
const format = require('./format')

module.exports = function(_deepEqual) {
	return function deepEqual(actual, expected, message, ...info) {
		try {
			_deepEqual(actual, expected, message)
		} catch(e) {
			e.message += format(info)
			throw e
		}
	}
}