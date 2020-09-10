/**
 * @param {number[][]} A
 * @param {number[][]} B
 * @return {number}
 */
var largestOverlap = function(A, B) {
    let maxCount = 0, count = 0, N = A.length;
    for (let i = -N; i < N; i++) {
        for (let j = -N; j < N; j++) {
            for (let r = 0; r <= Math.abs(i) % i; r++) {
                for (let c = 0; c < N; c++) {
                    const a = A[r][c], b = B[N - 1 -r][N - 1 - c];
                    if (a == b) {
                        count++;
                    }
                }
            }
            if (count > maxCount) {
                maxCount = count;
            }
            count = 0;
        }
    }
    return maxCount;
};

export default  largestOverlap;