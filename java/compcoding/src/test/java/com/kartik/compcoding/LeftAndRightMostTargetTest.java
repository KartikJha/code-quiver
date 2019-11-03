package com.kartik.compcoding;

import org.junit.Assert;
import org.junit.Test;


public class LeftAndRightMostTargetTest {
    @Test
    public void basicTest1() {
        int[] out = LeftAndRightMostTarget.searchRange(new int[] {5,7,7,8,8,10}, 8);
        Assert.assertEquals(3, out[0]);
        Assert.assertEquals(4, out[1]);
    }

    @Test
    public void basicTest2() {
        int[] out = LeftAndRightMostTarget.searchRange(new int[] {5,7,7,8,8,8,10}, 8);
        Assert.assertEquals(3, out[0]);
        Assert.assertEquals(5, out[1]);
    }

    @Test
    public void basicTest3() {
        int[] out = LeftAndRightMostTarget.searchRange(new int[] {5,7,7,8,8,8,10}, 8);
        Assert.assertEquals(3, out[0]);
        Assert.assertEquals(5, out[1]);
    }

    @Test
    public void basicTest4() {
        int[] out = LeftAndRightMostTarget.searchRange(new int[] {5,7,7,8,10}, 8);
        Assert.assertEquals(3, out[0]);
        Assert.assertEquals(3, out[1]);
    }

    @Test
    public void basicTest5() {
        int[] out = LeftAndRightMostTarget.searchRange(new int[] {5,7,7,10}, 8);
        Assert.assertEquals(-1, out[0]);
        Assert.assertEquals(-1, out[1]);
    }

    @Test
    public void basicTest6() {
        int[] out = LeftAndRightMostTarget.searchRange(new int[] {8}, 8);
        Assert.assertEquals(0, out[0]);
        Assert.assertEquals(0, out[1]);
    }

    @Test
    public void basicTest7() {
        int[] out = LeftAndRightMostTarget.searchRange(new int[] {1}, 8);
        Assert.assertEquals(-1, out[0]);
        Assert.assertEquals(-1, out[1]);
    }

    @Test
    public void basicTest8() {
        int[] out = LeftAndRightMostTarget.searchRange(new int[] {5,7,7,8,10}, 10);
        Assert.assertEquals(4, out[0]);
        Assert.assertEquals(4, out[1]);
    }

    @Test
    public void basicTest9() {
        int[] out = LeftAndRightMostTarget.searchRange(new int[] {5,7,7,8,10}, 5);
        Assert.assertEquals(0, out[0]);
        Assert.assertEquals(0, out[1]);
    }

    @Test
    public void basicTest10() {
        int[] out = LeftAndRightMostTarget.searchRange(new int[] {}, 0);
        Assert.assertEquals(-1, out[0]);
        Assert.assertEquals(-1, out[1]);
    }

//    @Test
//    public void basicTest2() {
//        Assert.assertEquals([], LeftAndRightMostTarget.searchRange("[[]]"));
//    }
//
//    @Test
//    public void basicTest3() {
//        Assert.assertEquals([], LeftAndRightMostTarget.searchRange("[[}]]"));
//    }
//
//    @Test
//    public void basicTest4() {
//        Assert.assertEquals([], LeftAndRightMostTarget.searchRange("[[{}]]"));
//    }
}
