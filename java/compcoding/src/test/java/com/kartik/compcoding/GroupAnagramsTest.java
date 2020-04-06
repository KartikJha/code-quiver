package com.kartik.compcoding;

import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class GroupAnagramsTest {
  @Test
  public void basicTest1() {
    Assert.assertArrayEquals(
        Arrays.asList(
                Arrays.asList("eat", "tea", "ate"),
                Arrays.asList("tan", "nat"),
                Arrays.asList("bat"))
            .toArray(),
        GroupAnagrams.groupAnagrams(new String[] {"eat", "tea", "tan", "ate", "nat", "bat"})
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
