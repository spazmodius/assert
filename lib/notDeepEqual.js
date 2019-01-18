'use strict'
const format = require('./format')
const { inspect } = require('util')

module.exports = function(_notDeepEqual) {
	return function notDeepEqual(actual, expected, message, ...info) {
		if (message === undefined)
			message = `Failed, deeply-equal values: ${inspect(actual)}`
		try {
			_notDeepEqual(actual, expected, message)
		} catch(e) {
			e.message += format(info)
			throw e
		}
	}
}