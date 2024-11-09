/* global expect, test */
import func from '../max_frequency_after_operation';

test('basic test 1', () => {
  expect(func([88, 53], 27, 2)).toBe(2);
});

// test('basic test 2', () => {
//   expect(func([3, 5, 12, 5, 13])).toBe(true);
// });
