/* global expect, test */
import func from '../edit-distance';

test('basicTest 1', () => {
  expect(func('biting', 'sitting')).toBe(2);
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