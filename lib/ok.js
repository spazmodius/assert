'use strict'
const augment = require('./augment')

module.exports = function(_ok) {
	return function ok(value, message, ...info) {
		if (message === undefined)
			message = `Failed, falsy value: ${value}`
		try {
			_ok(value, message)
		} catch(e) {
			throw augment(e, info)
		}
	}
}