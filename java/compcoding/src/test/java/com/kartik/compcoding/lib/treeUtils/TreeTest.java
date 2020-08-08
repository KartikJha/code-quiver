package com.kartik.compcoding.lib.treeUtils;

import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import java.util.Arrays;

public class TreeTest {

//    /**
//     * throws IllegalArgumentException when either or both of the arguments are null
//     */
//    @Test
//    public void handlesNullInputs() {
//        thrown.expect(IllegalArgumentException.class);
//        Main.getBadDays(null, null);
//    }
//
//    @Test
//    public void handlesLessArguments() {
//        thrown.expect(IllegalArgumentException.class);
//        Main.getBadDays("List");
//    }
//
//    @Test
//    public void handlesMoreArguments() {
//        thrown.expect(IllegalArgumentException.class);
//        Main.getBadDays("List", new ArrayList<>(), 1);
//    }
//
//    @Test
//    public void handlesTypeMismatch() {
//        thrown.expect(IllegalArgumentException.class);
//        Main.getBadDays(new ArrayList<>(), 1);
//    }
//
//    /**
//     * returns empty string when list is empty
//     */
//    @Test
//    public void emptyList() {
//        Assert.assertEquals("", Main.getBadDays("Hello", new ArrayList<>()));
//    }
//
//    @Test
//    public void basicTest1() {
//        Assert.assertEquals("apple", Main.getBadDays("abppplee", new ArrayList<>(Arrays.asList(new String[] {"able", "ale", "apple", "bale", "kangaroo"}))));
//    }

//  @Test
//  public void basicTest1() {
//    Assert.assertEquals((Integer) 3 , BadDays.getBadDays(Arrays.asList(3l, 9l, 4l, 6l, 7l, 5l)));
//  }
//
//  @Test
//  public void basicTest2() {
//    Assert.assertEquals((Integer) 0 , BadDays.getBadDays(Arrays.asList(1000000l)));
//  }
//
//  @Test
//  public void basicTest3() {
//    Assert.assertEquals((Integer) 8 , BadDays.getBadDays(Arrays.asList(31l ,41l, 59l, 26l, 53l, 58l, 97l, 93l, 23l, 84l)));
//  }

//    @Test
//    public void edgeTest1() {
//        Assert.assertEquals((Integer) 8 , Main.getBadDays(Arrays.asList()));
//    }

  @Test
  public void basicTest1() {
    Tree<Integer> testTree = new Tree<>(3, new Tree(2, ))
    Assert.assertArrayEquals();
  }

}
