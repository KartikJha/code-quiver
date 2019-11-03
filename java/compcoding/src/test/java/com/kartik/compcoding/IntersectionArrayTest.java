package com.kartik.compcoding;

import org.junit.Test;
import org.junit.Assert;

import java.util.Arrays;
import java.util.List;


public class IntersectionArrayTest {
    @Test
    public void basicTest1() {
        List out = IntersectionArray.arraysIntersection(new int[]{1,2,3,4,5}, new int[]{1,2,5,7,9}, new int[]{1,3,4,5,8});
        System.out.println(out.toString());
        Assert.assertEquals(out.get(0), 1);
        Assert.assertEquals(out.get(1), 5);
//        Assert.assertArrayEquals(new int[]{0, 1}, IntersectionArray.arraysIntersection(new int[]{1,2,3,4,5}, new int[]{1,2,5,7,9}, new int[]{1,3,4,5,8}));
    }

    @Test
    public void basicTest2() {
        List out = IntersectionArray.arraysIntersection(new int[]{}, new int[]{1,2,5,7,9}, new int[]{1,3,4,5,8});
        System.out.println(out.toString());
        Assert.assertEquals(out.size(), 0);
//        Assert.assertEquals(out.get(0), 1);
//        Assert.assertEquals(out.get(1), 5);
//        Assert.assertArrayEquals(new int[]{0, 1}, IntersectionArray.arraysIntersection(new int[]{1,2,3,4,5}, new int[]{1,2,5,7,9}, new int[]{1,3,4,5,8}));
    }

    @Test
    public void basicTest3() {
        List out = IntersectionArray.arraysIntersection(new int[]{1,2,5}, new int[]{1,2,3,5,7,9}, new int[]{1,2,5,8});
        System.out.println(out.toString());
        Assert.assertEquals(out.get(0), 1);
        Assert.assertEquals(out.get(1), 2);
        Assert.assertEquals(out.get(2), 5);
//        Assert.assertArrayEquals(new int[]{0, 1}, IntersectionArray.arraysIntersection(new int[]{1,2,3,4,5}, new int[]{1,2,5,7,9}, new int[]{1,3,4,5,8}));
    }
//    @Test
//    public void basicTest2() {
//        Assert.assertArrayEquals(new int[]{-1, -1}, IntersectionArray.arraysIntersection(new int[]{}, 9));
//    }
//
//    @Test
//    public void basicTest3() {
//        Assert.assertArrayEquals(new int[]{0, 2}, IntersectionArray.arraysIntersection(new int[]{-7, 2, 4, 5}, -3));
//    }
}
