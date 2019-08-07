'use strict'
const assertions = require('./lib/assertions')
const { that } = require('./lib/that')
const { register } = require('./lib/register')

const assert = Object.assign(assertions.ok, assertions)

Object.defineProperties(assert, {
	that: { value: that, enumerable: false },
	register: { value: register, enumerable: false },
})

module.exports = assert
