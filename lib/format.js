'use strict'
const { inspect } = require('util')

const intro = '\n>'

function _format(value) {
	return intro + inspect(value)
}

function format(info) {
	return info.map(_format).join('')
}

module.exports = format
