package com.kartik.compcoding;

import java.util.ArrayList;
import java.util.List;

public class TestJava {
  List<Integer> arr = new ArrayList<>();
  // 9, 89, 90, 356, 358
  // 9, 97      - > A , AAAA -> 997 instead of 979

  // 1, 2, 3, 4  , k = 2

  [1, 2], [2, 3], [1, 3], [3, 4], [1, 4], [2, 4]

  [1, 2, 3], [2, 3, 4], [3, 4, 1], [1, 2, 4]

  [1, 2, 3, 4]

  prev = null;
  curr = head;

  while (curr.next ! = null) {
    Node temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
  }
  1 -> 2 -> 3 -> 4
}
