/* global expect, test */
import func from '../cses/distinct_values_subarray';

test('basic test 1', () => {
  expect(func([1, 2, 1, 3])).toBe(4);
});

// test('basic test 2', () => {
//   expect(func([3, 5, 12, 5, 13])).toBe(true);
// });
