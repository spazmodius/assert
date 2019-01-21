'use strict'
const augment = require('./augment')
const { inspect } = require('util')

module.exports = function(_notDeepEqual) {
	return function notDeepEqual(actual, expected, message, ...info) {
		if (message === undefined)
			message = `Failed, deeply-equal values: ${inspect(actual)}`
		try {
			_notDeepEqual(actual, expected, message)
		} catch(e) {
			throw augment(e, info)
		}
	}
}