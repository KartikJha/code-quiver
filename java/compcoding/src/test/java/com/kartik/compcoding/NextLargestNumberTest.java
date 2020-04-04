package com.kartik.compcoding;

import org.junit.Assert;
import org.junit.Test;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;

public class NextLargestNumberTest {
    @Test
    public void basicTest1() {
        Assert.assertArrayEquals(NextLargestNumber.getResult(Arrays.<Integer>asList(1, 3, 2, 4)).toArray(), Arrays.<Integer>asList(3, 4, 4, -1).toArray());
    }
}
