# Spaz's Debug-only Asserts

Liberal use of assertions in your code is an important way to self-document assumptions and expected conditions.  
But, of course, they cost cycles.

This module lets you use assertions like they're free, because, in production, they are!

All calls in this module become no-ops when the environment defines either:

 - `NODE_ENV=production`
 - `NO_ASSERT=1` (any truthy value)

## Installation and Usage
```
npm install spazmodius/assert
```

```js
const assert = require('@spazmodius/assert')
assert(count < MAX_COUNT, 'count is too large')
```

## Compatible With Node's Assert API

This module exposes a subset of the [Node.js Assert API](https://nodejs.org/api/assert.html), using [strict mode](https://nodejs.org/api/assert.html#assert_strict_mode) 
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
assert.ok(count < MAX_COUNT, 'count is too large')
assert.fail('should never get here')
assert.equal(remaining, 0, 'still some remaining')
assert.notEqual(name, '', 'name is missing')
assert.deepEqual(origin, {x:0, y:0}, 'origin is misaligned')
assert.notDeepEqual(options, {}, 'no options given')
assert.throws(() => { throw new Error('wat??') }, /wat/)
assert.doesNotThrow(() => JSON.parse(json), SyntaxError, 'invalid JSON')
```

## Custom Assertions

The available assertions can be extended by registering **custom assertions**.

### assert.register(_[name], predicate, [defaultMessage]_)

Argument | Type | Optional | Description
---|---|---|---
`name` | string | &check; | Name of the new assertion. Defaults to name of `predicate` function
`predicate` | function | | Function that evaluates its arguments, and returns a falsy value on failure
`defaultMessage` | string or function | &check; | Message to use when this assertion fails and the caller did not supply a message

**Returns** `assert` (to allow chaining)

Custom logic is coded in the `predicate` function.  This function must take a fixed number of arguments, none of which are considered optional (it's `.length` is used internally). It returns a falsy value if the assertion fails.

The `defaultMessage` argument provides the default message to use if this assertion fails.
If it is a function, it will be called with the same arguments passed to `predicate`,
and it should return a string or `undefined`.
Omitting this argument, or returning `undefined`, will use an auto-generated message, which is usually pretty good.

Registration results in a custom assertion **assert._name_()**, which takes the same parameters as `predicate`, plus an optional `message` parameter.
Custom assertions automatically benefit from **[No-op Actual Evaluation](#no-op-actual-evaluation)** and **[Informational Arguments](#informational-arguments)**.

#### Simple registration:
```js
function startsWith(actual, prefix) { 
	return actual.indexOf(prefix) === 0 
}
assert.register(startsWith)

assert.startsWith('abcd', 'xyz')
// Throws [AssertionError [ERR_ASSERTION]: 'abcd' startsWith 'xyz']
```

#### Full-control registration:
```js
assert.register('lt', (x, y) => x < y, (x, y) => `${x} should be less than ${y}` )

assert.lt(99, 5)
// Throws [AssertionError [ERR_ASSERTION]: 99 should be less than 5]
```

## No-op Actual Evaluation

Even when assertions are no-op'd, there might still be a cost for evalulating arguments.

Consider the example: 
```js
assert(count < MAX_COUNT, 'count is too large')
```

Even if `assert()` is a no-op, the expression `count < MAX_COUNT` is evaluated unnecessarily.
Even more expensive is this next line of code, which always allocates a closure, even when it won't be called:
```js
assert.doesNotThrow(() => JSON.parse(json), SyntaxError, 'invalid JSON')
```

To handle such situations cleanly, this module implements an extension to defer calculation of the `actual` argument; this will no-op in production.

### assert.that(_fn, [args...]_).ok(_[message]_)
### assert.that(_fn, [args...]_).equal(_expected, [message]_)
### assert.that(_fn, [args...]_).notEqual(_expected, [message]_)
### assert.that(_fn, [args...]_).deepEqual(_expected, [message]_)
### assert.that(_fn, [args...]_).notDeepEqual(_expected, [message]_)
### assert.that(_fn, [args...]_).throws(_expected, [error], [message]_)
### assert.that(_fn, [args...]_).doesNotThrow(_expected, [error], [message]_)

Function `fn` is called with arguments `args`, and the result is passed as the `actual` argument to the corresponding assertion.
In the case of `.throws()` and `.doesNotThrow()`,
a lambda that calls the function `fn` with arguments `args` is passed.

For example:
```js
const isValid = n => n < MAX_COUNT
assert.that(isValid, count).ok('count is too large')

assert.that(JSON.parse, json).doesNotThrow(SyntaxError, 'invalid JSON')
```

## Informational Arguments

For simplicity, all the assertions above are shown ending with a `message` parameter.
However, every assertion can take additional **informational arguments** after the `message`.
When the assertion fails, 
these values will be represented in the error message,
and included in the error object, as the `info` property (an array).

When passing informational arguments, the normally optional `message` argument must be specified (but can be `undefined`).
