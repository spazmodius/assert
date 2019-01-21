'use strict'
const augment = require('./augment')
const { inspect } = require('util')

module.exports = function(_notEqual) {
	return function notEqual(actual, expected, message, ...info) {
		if (message === undefined)
			message = `Failed, equal values: ${inspect(actual)}`
		try {
			_notEqual(actual, expected, message)
		} catch(e) {
			throw augment(e, info)
		}
	}
}