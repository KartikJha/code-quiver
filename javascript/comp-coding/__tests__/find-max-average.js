/* global expect, test */
import func from '../find-max-average';

test('basic test 1', () => {
  expect(func([9, 7, 3, 5, 6, 2, 0, 8, 1, 9], 6)).toBe(5.33333);
});

// test('basic test 2', () => {
//   expect(func([3, 5, 12, 5, 13])).toBe(true);
// });
