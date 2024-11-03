/* global expect, test */
import func from '../product-array-self';

test('basicTest 1', () => {
  expect(func([1,2,3,4])).toStrictEqual([24,12,8,6]);
});

test('basicTest 2', () => {
    expect(func([-1,1,0,-3,3])).toStrictEqual([0,0,9,0,0]);
});
/**
 * biting
 * sitting
 * 
 * s 1
 * sit
 * sitt 1
 * sitting
 */