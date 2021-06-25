package com.kartik.compcoding.lib.array;

public class ArrayMutations {
    /**
     * ReshapeMatrix
     * @param mat
     * @param r
     * @param c
     * @return
     */
    public int[][] matrixReshape(int[][] mat, int r, int c) {
        int m = mat.length, n = mat[0].length,  i = 0, j = 0;
        if (m * n != r * c) {
            return mat;
        }
        int[][] nMat = new int[r][c];
        for (int k = 0; k < r; k++) {
            for (int l = 0; l < c; l++) {
                int[] vals = getNextVals(i, j, m, n, mat);
                i = vals[1]; 
                j = vals[2];
                nMat[k][l] = vals[0];
            }
        }
        return nMat;
    }
    
    private static int[] getNextVals(int i, int j, int m, int n, int[][] mat) {
        if (i < m && j < n) {
            return new int[]{mat[i][j], i, j + 1};
        }
        if (i < m) {
            return new int[]{mat[i + 1][0], i + 1, 1};
        }
        return new int[0];
    }
}
