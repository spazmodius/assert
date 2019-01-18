'use strict'
const { inspect } = require('util')

const intro = '\n>'

function _format(msg) {
	return intro + inspect(msg)
}

function format(msgs) {
	return msgs.map(_format).join('')
}

module.exports = format
