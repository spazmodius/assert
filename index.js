'use strict'

const production = process.env.no_assert || process.env.node_env === 'production'

module.exports = production?
	require('./noop'):
	require('./assert')
