/* global expect, test */
import func from '../pythagorean-triplet';

test('basic test 1', () => {
  expect(func([3, 4, 5])).toBe(true);
  expect(func([3, 5, 5])).toBe(false);
});

test('basic test 2', () => {
  expect(func([3, 5, 12, 5, 13])).toBe(true);
});
