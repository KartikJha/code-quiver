/* global expect, test */
import func from '../string-compression';

test('basic test 1', () => {
    const chars = ['a', 'a', 'b', 'b', 'c', 'c', 'c'];
    expect(func(chars)).toBe(6);
    expect(chars).toStrictEqual(["a","2","b","2","c","3"])
});

test('basic test 2', () => {
    const chars = ["8","I","o","n","U","H","V",",",">","<"]
    expect(func(chars)).toBe(10);
    expect(chars).toStrictEqual(["8","I","o","n","U","H","V",",",">","<"])
});

// test('basic test 2', () => {
//   expect(func([3, 5, 12, 5, 13])).toBe(true);
// });
