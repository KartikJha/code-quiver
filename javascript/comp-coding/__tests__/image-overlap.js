/* global expect, test */
import func from '../image-overlap';

test('basicTest 1', () => {
    const out = func([[1, 1, 0],
    [0, 1, 0],
    [0, 1, 0]], [[0, 0, 0],
    [0, 1, 1],
    [0, 0, 1]])
    console.log(out);
    expect(out).toStrictEqual(3);
});

