/* global expect, test */
import func from '../non-decreasing-array';

test('returns true for non-empty array', () => {
  expect(func([1, 2, 3])).toBe(true);
});
