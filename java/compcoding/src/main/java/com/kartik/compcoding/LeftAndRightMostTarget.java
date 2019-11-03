package com.kartik.compcoding;

class LeftAndRightMostTarget {
    static int[] searchRange(int[] nums, int target) {
        if (nums.length == 0) {
            return new int[] {-1, -1};
        }
        int lh = nums.length - 1, rl = 0, ll = 0, rh = nums.length - 1;

        // search for leftmost
        while (ll < lh) {
            int[] uI = updateRange(nums, ll, lh, target, false);
            ll = uI[0];
            lh = uI[1];
        }

        // search for rightmost
        while (rl < rh) {
            int[] uI = updateRange(nums, rl, rh, target, true);
            rl = uI[0];
            rh = uI[1];
        }

        if (nums[ll] != target) {
            ll = -1;
            rl = -1;
        }
        return new int[]{ll, rl};
    }

    private static int[] updateRange(int[] nums, int l, int h, int target, boolean isRight) {
        int mid = isRight ? ((h - l) / 2 + l + 1) : ((h - l) / 2 + l);
        if (nums[mid] == target) {
            if (isRight) {
                return new int[]{mid, h};
            }
            return new int[]{l, mid};
        }

        if (nums[mid] > target) {
            return new int[]{l, mid - 1};
        }

        return new int[]{mid + 1, h};
    }
}