/* global expect, test */
import func from '../string-queries';

test('basic test 1', () => {
  expect(
    func('suyakuteavqpiohrmyubzlotgwaaqpkzeuijpfmrkygattwlsu', [
      '2 49',
      '1 50',
      '5 46',
      '4 47',
      '3 48'
    ])
  ).toBe('16\n16\n14\n14\n14');
});

// test('basic test 2', () => {
//   expect(func([3, 5, 12, 5, 13])).toBe(true);
// });
