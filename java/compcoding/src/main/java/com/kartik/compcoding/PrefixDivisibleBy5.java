package com.kartik.compcoding;

import java.util.ArrayList;
import java.util.List;

public class PrefixDivisibleBy5 {
    public List<Boolean> prefixesDivBy5(int[] nums) {
        long curr = 0;
        List<Boolean> res = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            curr = (curr * 2) + nums[i];
            if (curr % 5 == 0) {
                curr = 0;
                res.add(true);
            } else {
                curr %= 5;
                res.add(false);
            }
        }
        return res;
    }
}
