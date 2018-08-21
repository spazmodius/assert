# Spaz's Debug-only Asserts

This module exposes a subset of the [Node.js Assert API](https://nodejs.org/api/assert.html).

These assertions become no-ops in environments where either:

 - `NODE_ENV=production`
 - `NO_ASSERT=1`

## Usage
``` js
const assert = require('@spazmodius/assert')

assert(count < MAX_COUNT, 'count is too large')
assert.fail('should never get here')
assert.equal(remaining, 0, 'still some remaining')
assert.notEqual(text, null, 'text is missing')
assert.deepEqual(origin, {x:0, y:0}, 'origin is misaligned')
assert.notDeepEqual(options, {}, 'no options given')
```

## Note

All the exposed assertions use [strict mode](https://nodejs.org/api/assert.html#assert_strict_mode) for comparisons.