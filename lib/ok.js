'use strict'
const format = require('./format')

module.exports = function(_ok) {
	return function ok(value, message, ...info) {
		if (message === undefined)
			message = `Failed, falsy value: ${value}`
		try {
			_ok(value, message)
		} catch(e) {
			e.message += format(info)
			throw e
		}
	}
}