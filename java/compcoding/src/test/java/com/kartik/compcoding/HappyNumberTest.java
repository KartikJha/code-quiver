package com.kartik.compcoding;

import org.junit.Assert;
import org.junit.Test;

public class HappyNumberTest {
    @Test
    public void basicTest1() {
        Assert.assertTrue(HappyNumber.isHappy(19));
    }
}
