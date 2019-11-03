package com.kartik.compcoding;

import org.junit.Assert;
import org.junit.Test;

public class ValidParanthesesTest {
    @Test
    public void basicTest1() {
        Assert.assertEquals(true, ValidParantheses.isValid(""));
    }

    @Test
    public void basicTest2() {
        Assert.assertEquals(true, ValidParantheses.isValid("[[]]"));
    }

    @Test
    public void basicTest3() {
        Assert.assertEquals(false, ValidParantheses.isValid("[[}]]"));
    }

    @Test
    public void basicTest4() {
        Assert.assertEquals(true, ValidParantheses.isValid("[[{}]]"));
    }
}
