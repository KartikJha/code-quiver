package com.kartik.compcoding;

import java.util.HashMap;
import java.util.Map;

class UniquePaths3 {
    public static int uniquePathsIII(int[][] grid) {
        Map<String, Boolean> seen = new HashMap<>();
        return dfs(grid, new int[]{0,0}, 0, seen);
    }
    
    public static int dfs(int[][] grid, int[] p, int pathsFound, Map<String, Boolean> seen) {
        System.out.println(seen);
        System.out.println(p[0] + "-" + p[1]);
        if ((p[1] >= grid[0].length || p[0] >= grid.length || p[1] < 0 || p[0] < 0) || grid[p[0]][p[1]] == -1 || seen.getOrDefault(p[0] + "-" + p[1], false)) {
            System.out.println("DISCARDED");
            return 0;
        }
        Map<String, Boolean> seenSubtree = new HashMap<>(seen);
        seenSubtree.putIfAbsent(p[0] + "-" + p[1], true);
        if (grid[p[0]][p[1]] == 2) {
            System.out.println("ADDED");
           return 1;
        }
        int[] left = new int[]{p[0], p[1] - 1};
        int[] right = new int[]{p[0], p[1] + 1};
        int[] top = new int[]{p[0] - 1, p[1]};
        int[] bot = new int[]{p[0] + 1, p[1]};
        System.out.println("EXTENDED");
        return pathsFound + dfs(grid, left, 0, seenSubtree) + dfs(grid, right, 0, seenSubtree) + dfs(grid, top, 0, seenSubtree) + dfs(grid, bot, 0, seenSubtree);
    }

    public static void main(String[] args) {
        System.out.println(uniquePathsIII(new int[][]{{1,0,0,0},{0,0,0,0},{0,0,0,2}}));
    }
}