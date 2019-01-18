'use strict'
const format = require('./format')

module.exports = function(_ok) {
	return function ok(value, message, ...msgs) {
		if (arguments.length === 0)
			return _ok()
		if (message === undefined)
			message = `Falsy value: ${value}`
		if (message instanceof Error) 
			message.message += format(msgs)
		else 
			message += format(msgs)
		_ok(value, message)
	}
}