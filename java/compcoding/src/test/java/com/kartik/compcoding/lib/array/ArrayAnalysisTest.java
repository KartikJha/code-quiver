package com.kartik.compcoding.lib.array;

import com.kartik.compcoding.lib.array.ArrayAnalysis;
import org.junit.Assert;
import org.junit.Test;

import java.util.Arrays;

public class ArrayAnalysisTest {
  @Test
  public void basicTest1() {
    Assert.assertArrayEquals(
        Arrays.<Integer>asList(0, 0).toArray(),
        ArrayAnalysis.getDuplicateRCFromMatrix(
                new String[][] {
                  new String[] {"1", "2", "3", "4"},
                  new String[] {"2", "1", "4", "3"},
                  new String[] {"3", "4", "1", "2"},
                  new String[] {"4", "3", "2", "1"}
                })
            .toArray());
  }

  @Test
  public void basicTest2() {
    Assert.assertArrayEquals(
        Arrays.<Integer>asList(0, 2).toArray(),
        ArrayAnalysis.getDuplicateRCFromMatrix(
                new String[][] {
                  new String[] {"2", "1", "3"},
                  new String[] {"1", "3", "2"},
                  new String[] {"1", "2", "3"}
                })
            .toArray());
  }

  @Test
  public void basicTest3() {
    Assert.assertArrayEquals(
        Arrays.<Integer>asList(4, 4).toArray(),
        ArrayAnalysis.getDuplicateRCFromMatrix(
                new String[][] {
                  new String[] {"2", "2", "2", "2"},
                  new String[] {"2", "3", "2", "3"},
                  new String[] {"2", "2", "2", "3"},
                  new String[] {"2", "2", "2", "2"}
                })
            .toArray());
  }
}

/*
1 2 3 4
2 1 4 3
3 4 1 2
4 3 2 1
 */

/*
2 2 2 2
2 3 2 3
2 2 2 3
2 2 2 2
 */
