'use strict'
const augment = require('./augment')

module.exports = function(_fail) {
	return function fail(message, ...info) {
		if (message === undefined)
			message = 'Failed'
		try {
			_fail(message)
		} catch(e) {
			throw augment(e, info)
		}
	}
}