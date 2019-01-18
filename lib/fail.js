'use strict'
const format = require('./format')

module.exports = function(_fail) {
	return function fail(message, ...msgs) {
		if (message === undefined)
			message = 'Failed'
		if (message instanceof Error) 
			message.message += format(msgs)
		else 
			message += format(msgs)
		_fail(message)
	}
}