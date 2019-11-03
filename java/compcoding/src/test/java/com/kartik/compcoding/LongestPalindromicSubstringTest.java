package com.kartik.compcoding;

import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

public class LongestPalindromicSubstringTest {

    @Test
    public void basicTest1() {
        Assert.assertEquals("bab", LongestPalindromicSubstring.longestPalindrome("babad"));
    }

    @Test
    public void basicTest2() {
        Assert.assertEquals("bb", LongestPalindromicSubstring.longestPalindrome("cbbd"));
    }

    @Test
    public void basicTest3() {
        Assert.assertEquals("", LongestPalindromicSubstring.longestPalindrome(""));
    }

    @Test
    public void basicTest4() {
        Assert.assertEquals("bb", LongestPalindromicSubstring.longestPalindrome("abb"));
    }

    @Test
    public void mediumTest1() {
        Assert.assertEquals("illi", LongestPalindromicSubstring.longestPalindrome("iptmykvjanwiihepqhzupneckpzomgvzmyoybzfynybpfybngttozprjbupciuinpzryritfmyxyppxigitnemanreexcpwscvcwddnfjswgprabdggbgcillisyoskdodzlpbltefiz"));
    }
}
