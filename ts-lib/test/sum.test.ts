import assert from "node:assert"
import test from "node:test"
import {sum} from "../src"

test(`Ensure sum(1,1) == 2`, () => {
  assert.strictEqual(sum(1, 1), 2)
})
test(`Ensure sum(1,3) == 4`, () => {
  assert.strictEqual(sum(1, 3), 4)
})
