package com.kartik.compcoding.codejam2020.qualification;

import org.junit.Assert;
import org.junit.Test;

public class ParentingParterningReturnsTest {

  @Test
  public void basicTest1() {
    Assert.assertEquals(
        "JCC",
        ParentingParterningReturns.getSchedule(
            new String[][] {
              new String[] {"360", "480"}, new String[] {"420", "540"}, new String[] {"600", "660"},
            },
            new char[] {'J', 'C'}));
  }

  @Test
  public void basicTest2() {
    Assert.assertEquals(
        null,
        ParentingParterningReturns.getSchedule(
            new String[][] {
              new String[] {"0", "1440"}, new String[] {"1", "3"}, new String[] {"2", "4"},
            },
            new char[] {'J', 'C'}));
  }

  @Test
  public void basicTest3() {
    Assert.assertEquals(
        "CJJCC",
        ParentingParterningReturns.getSchedule(
            new String[][] {
              new String[] {"99", "150"},
              new String[] {"1", "100"},
              new String[] {"100", "301"},
              new String[] {"2", "5"},
              new String[] {"150", "250"}
            },
            new char[] {'J', 'C'}));
  }

  @Test
  public void basicTest4() {
    Assert.assertEquals(
        "JC",
        ParentingParterningReturns.getSchedule(
            new String[][] {
              new String[] {"0", "1440"},
              new String[] {"0", "1440"},
            },
            new char[] {'J', 'C'}));
  }

  @Test
  public void basicTest5() {
    Assert.assertEquals(
        null,
        ParentingParterningReturns.getSchedule(
            new String[][] {
              new String[] {"56", "720"}, new String[] {"45", "98"}, new String[] {"70", "200"},
            },
            new char[] {'J', 'C'}));
  }

  @Test
  public void basicTest6() {
    Assert.assertEquals(
         "CJCCJJ",
        ParentingParterningReturns.getSchedule(
            new String[][] {
              new String[] {"99", "150"},
              new String[] {"1", "99"},
              new String[] {"160", "301"},
              new String[] {"2", "5"},
              new String[] {"150", "250"},
                    new String[] {"99", "150"}
            },
            new char[] {'J', 'C'}));
  }


}
// CJCCJJ
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

/*
420 540
600 660
 */

/*
0 1440
1 3
2 4
 */

/*
99 150
1 100
100 301
2 5
150 250
 */
