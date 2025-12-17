import test from "node:test";
import assert from "node:assert/strict";

import { levenshtein, findNearestMatch } from "../src/utils/levenshtein.js";

test("levenshtein computes the edit distance between strings", () => {
  assert.equal(levenshtein("", "abc"), 3);
  assert.equal(levenshtein("kitten", "sitting"), 3);
  assert.equal(levenshtein("same", "same"), 0);
});

test("findNearestMatch returns the closest candidates in order", () => {
  const matches = findNearestMatch("speck", ["spec", "log", "step"], 2);
  assert.deepEqual(matches, ["spec", "step"]);
});
