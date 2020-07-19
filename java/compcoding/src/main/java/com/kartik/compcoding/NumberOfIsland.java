package com.kartik.compcoding;

import java.util.HashMap;
import java.util.Map;

public class NumberOfIsland {
  public int numIslands(char[][] grid) {
    Map<String, Boolean> seen = new HashMap<>();
    int count = 0;
    for (int i = 0; i < grid.length; i++) {
      for (int j = 0; j < grid[0].length; j++) {
        if (!seen.getOrDefault(i + "-" + j, false) && grid[i][j] == '1') {
          count++;
          seen.put(i + "-" + j, true);
          checkAdjacent(i, j, grid, seen);
        }
        System.out.println(seen);
      }
    }
    return count;
  }

  private void checkAdjacent(int r, int c, char[][] g, Map<String, Boolean> s) {
    int nR = r + 1, nC = c + 1, nR1 = r - 1, nC1 = c - 1;
    if (nR < g.length && !s.getOrDefault(nR + "-" + c, false) && g[nR][c] == '1') {
      s.put(nR + "-" + c, true);
      checkAdjacent(nR, c, g, s);
    }

    if (nR1 > -1 && !s.getOrDefault(nR1 + "-" + c, false) && g[nR1][c] == '1') {
      s.put(nR1 + "-" + c, true);
      checkAdjacent(nR1, c, g, s);
    }

    if (nC < g[0].length && !s.getOrDefault(r + "-" + nC, false) && g[r][nC] == '1') {
      s.put(r + "-" + nC, true);
      checkAdjacent(r, nC, g, s);
    }

    if (nC1 > -1 && !s.getOrDefault(r + "-" + nC1, false) && g[r][nC1] == '1') {
      s.put(r + "-" + nC1, true);
      checkAdjacent(r, nC1, g, s);
    }
  }
}