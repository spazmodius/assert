'use strict'
const format = require('./format')

module.exports = function(_equal) {
	return function equal(actual, expected, message, ...info) {
		try {
			_equal(actual, expected, message)
		} catch(e) {
			e.message += format(info)
			throw e
		}
	}
}