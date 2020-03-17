package com.kartik.compcoding;

import org.junit.Assert;
import org.junit.Test;

import java.util.Arrays;

public class DistinctSumTest {

//    @Test
//    public void basicTest1() {
//        Assert.assertEquals(122, DistinctSum.possibleSums(new int[]{10, 50, 100, 500}, new int[]{5, 3, 2, 2}));
//    }

    @Test
    public void basicTest2() {
        Assert.assertEquals(9, DistinctSum.possibleSums(new int[]{10, 50, 100}, new int[]{1, 2, 1}));
    }

    @Test
    public void basicTest1() {
        Assert.assertEquals(122, DistinctSum.possibleSums(new int[]{10, 50, 100, 500}, new int[]{5, 3, 2, 2}));
    }

//    @Test
//    public void basicTest2() {
//        Assert.assertEquals((Integer) 0 , BadDays.getBadDays(Arrays.asList(1000000l)));
//    }
//
//    @Test
//    public void basicTest3() {
//        Assert.assertEquals((Integer) 8 , BadDays.getBadDays(Arrays.asList(31l ,41l, 59l, 26l, 53l, 58l, 97l, 93l, 23l, 84l)));
//    }
}
