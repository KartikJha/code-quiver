/* global expect, describe, it */
import { arrayHasOneDropPoint, compareElementsInArray } from '../lib';

describe('arrayHasOneDropPoint test', () => {
  it('returns null for array of size less than 1', () => {
    expect(arrayHasOneDropPoint([1])).toBeNull();
    expect(arrayHasOneDropPoint()).toBeNull();
  });

  it('passes basic test 1', () => {
    expect(arrayHasOneDropPoint([3, 4, 2, 3])).toBe(2);
  });
});

describe('compareElementsInArray test', () => {
  it('return correct results', () => {
    expect(compareElementsInArray([1, 2, 3, 8, 1], [[0, 3, '<']])).toEqual([
      true
    ]);
  });

  it('passes basic test 1', () => {
    expect(compareElementsInArray([3, 4, 2, 3], [[0, 2, '<=']])).toEqual([
      false
    ]);
    expect(compareElementsInArray([3, 4, 2, 3], [[1, 3, '<=']])).toEqual([
      false
    ]);
  });
});
