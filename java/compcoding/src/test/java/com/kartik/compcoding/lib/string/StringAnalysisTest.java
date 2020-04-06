package com.kartik.compcoding.lib.string;

import org.junit.Assert;
import org.junit.Test;

public class StringAnalysisTest {
    @Test
    public void basicTest1() {
        Assert.assertTrue(StringAnalysis.areAnagrams("eat", "tea"));
    }

    @Test
    public void basicTest2() {
        Assert.assertFalse(StringAnalysis.areAnagrams("eat", "teaa"));
    }

    @Test
    public void basicTest3() {
        Assert.assertFalse(StringAnalysis.areAnagrams("eat", "tan"));
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
