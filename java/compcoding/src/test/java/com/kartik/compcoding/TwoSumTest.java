package com.kartik.compcoding;

import org.junit.Test;
import org.junit.Assert;

public class TwoSumTest {
    @Test
    public void basicTest1() {
        Assert.assertArrayEquals(new int[]{0, 1}, TwoSum.getNums(new int[]{2, 7, 11, 15}, 9));
    }

    @Test
    public void basicTest2() {
        Assert.assertArrayEquals(new int[]{-1, -1}, TwoSum.getNums(new int[]{}, 9));
    }

    @Test
    public void basicTest3() {
        Assert.assertArrayEquals(new int[]{0, 2}, TwoSum.getNums(new int[]{-7, 2, 4, 5}, -3));
    }
}
