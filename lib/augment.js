'use strict'
const { inspect } = require('util')

const intro = '\n>'

function _format(value) {
	return intro + inspect(value)
}

function format(info) {
	return info.map(_format).join('')
}

function augment(err, info) {
	err.message += format(info)
	if (err.info === undefined)
		err.info = info
	return err
}

module.exports = augment
