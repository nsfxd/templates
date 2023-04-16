import assert from 'node:assert'
import test from 'node:test'
import {sum} from 'src/sum'

test(`Ensure sum(1,1) == 2`, (t) => {
  assert.strictEqual(sum(1, 1), 2)
})
