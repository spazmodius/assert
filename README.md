# Spaz's Debug-only Asserts

Liberal use of assertions in your code 
is an important way to self-document
assumptions and expected conditions.  
But, of course, they cost cycles.

This module lets you use assertions 
like they're free, 
because, in production, they are!

All calls in this module become no-ops 
when the environment defines either:

 - `NODE_ENV=production`
 - `NO_ASSERT=1` (any truthy value)

## To Install
```
npm install spazmodius/assert
```

## Compatible With Node's Assert API

This module exposes a subset of the 
[Node.js Assert API](https://nodejs.org/api/assert.html), 
using 
[strict mode](https://nodejs.org/api/assert.html#assert_strict_mode) 
comparison.

### assert(_value, [message]_)

Alias for `assert.ok()`

### assert.ok(_value, [message]_)
### assert.fail(_[message]_)
### assert.equal(_actual, expected, [message]_)
### assert.notEqual(_actual, expected, [message]_)
### assert.deepEqual(_actual, expected, [message]_)
### assert.notDeepEqual(_actual, expected, [message]_)
### assert.throws(_fn, [error], [message]_)
### assert.doesNotThrow(_fn, [error], [message]_)

For example:
```js
const assert = require('@spazmodius/assert')

assert(count < MAX_COUNT, 'count is too large')
assert.fail('should never get here')
assert.equal(remaining, 0, 'still some remaining')
assert.notEqual(name, '', 'name is missing')
assert.deepEqual(origin, {x:0, y:0}, 'origin is misaligned')
assert.notDeepEqual(options, {}, 'no options given')
assert.throws(() => { throw new Error('wat??') }, /wat/)
assert.doesNotThrow(() => JSON.parse(json), SyntaxError, 'invalid JSON')
```

## No-op Argument Evaluation

However, even with assertions no-op'd, there might still be a cost for evalulating arguments.

Consider the example: 
```js
assert(count < MAX_COUNT, 'count is too large')
```

Even if `assert()` is a no-op, the expression `count < MAX_COUNT` is evaluated unnecessarily.

Or, even worse:
```js
assert.doesNotThrow(() => JSON.parse(json), SyntaxError, 'invalid JSON')
```

This always allocates a function closure to pass to `assert.doesNotThrow()`, even when not needed.

Therefore, this module implements an extension to defer calculation of the `actual` value (first parameter); this will no-op in production.

### assert.that(_fn, [args...]_).ok(_[message]_)
### assert.that(_fn, [args...]_).equal(_expected, [message]_)
### assert.that(_fn, [args...]_).notEqual(_expected, [message]_)
### assert.that(_fn, [args...]_).deepEqual(_expected, [message]_)
### assert.that(_fn, [args...]_).notDeepEqual(_expected, [message]_)

Calls the function `fn` with any arguments `args`, 
and passes the return value as the `actual` argument 
to the corresponding assertion.

For example:
```js
const isValid = n => n < MAX_COUNT
assert.that(isValid, count).ok('count is too large')
```

### assert.that(_fn, [args...]_).throws(_expected, [error], [message]_)
### assert.that(_fn, [args...]_).doesNotThrow(_expected, [error], [message]_)

Creates a lambda that 
calls the function `fn` with any arguments `args`, 
and passes that lambda as the `actual` argument 
to the corresponding assertion.

For example:
```js
assert.that(JSON.parse, json).doesNotThrow(SyntaxError, 'invalid JSON')
```

## Advanced Information Output

In addition to the compatible signatures,
every assertion method can take additional arguments
after the `message` argument.
Representations of these values will be included in the output
if the assertion throws.

When passing additional information arguments,
the normally optional `message` argument must also be passed.  
Passing `undefined` as a placeholder will
use the assertion's default message.