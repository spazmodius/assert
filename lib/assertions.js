'use strict'
const _assert = require('assert').strict || require('assert')

module.exports = {
	ok: require('./ok')(_assert.ok),
	fail: require('./fail')(_assert.fail),
	equal: require('./equal')(_assert.strictEqual || _assert.equal),
	notEqual: require('./notEqual')(_assert.notStrictEqual || _assert.notEqual),
	deepEqual: require('./deepEqual')(_assert.deepStrictEqual || _assert.deepEqual),
	notDeepEqual: require('./notDeepEqual')(_assert.notDeepStrictEqual || _assert.notDeepEqual),
	throws: require('./throws')(_assert.throws),
	doesNotThrow: require('./doesNotThrow')(_assert.doesNotThrow),
}