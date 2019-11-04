/* global expect, test */
import func from '../non-decreasing-array';

test('returns true for array of size less than 2', () => {
  expect(func([1, 2])).toBe(true);
  expect(func([56, 12])).toBe(true);
});

test('basicTest 1', () => {
  expect(func([13, 4, 7])).toBe(true);
});

test('basicTest 2', () => {
  expect(func([13, 7, 4])).toBe(false);
});

test('basicTest 3', () => {
  expect(func([3, 4, 2, 3])).toBe(false);
});
