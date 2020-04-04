package com.kartik.compcoding.lib.string;

import com.kartik.compcoding.lib.string.StringManipulation;
import org.junit.Assert;
import org.junit.Test;

public class StringManipulationTest {
    @Test
    public void basicTest1() {
        Assert.assertEquals("0000", StringManipulation.surroundBinaryStringByParens("0000"));
    }

    @Test
    public void basicTest2() {
        Assert.assertEquals("(1)0(1)", StringManipulation.surroundBinaryStringByParens("101"));
    }

    @Test
    public void basicTest3() {
        Assert.assertEquals("(111)000", StringManipulation.surroundBinaryStringByParens("111000"));
    }

//    @Test
//    public void basicTest4() {
//        Assert.assertEquals("0((2(3)))(1)", StringManipulation.surroundBinaryStringByParens("0231"));
//    }

    @Test
    public void basicTest5() {
        Assert.assertEquals("((22)1)", StringManipulation.surroundBinaryStringByParens("221"));
    }

    @Test
    public void basicTest6() {
        Assert.assertEquals("0((2)1)", StringManipulation.surroundBinaryStringByParens("021"));
    }

    @Test
    public void basicTest7() {
        Assert.assertEquals("(((3))1(2))", StringManipulation.surroundBinaryStringByParens("312"));
    }

    @Test
    public void basicTest8() {
        Assert.assertEquals("((((4))))", StringManipulation.surroundBinaryStringByParens("4"));
    }

    @Test
    public void getParensBasicTest1() {
        Assert.assertEquals("((((", StringManipulation.getParens('(', 4).toString());
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
