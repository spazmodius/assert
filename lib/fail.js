'use strict'
const format = require('./format')

module.exports = function(_fail) {
	return function fail(message, ...info) {
		if (message === undefined)
			message = 'Failed'
		try {
			_fail(message)
		} catch(e) {
			e.message += format(info)
			throw e
		}
	}
}