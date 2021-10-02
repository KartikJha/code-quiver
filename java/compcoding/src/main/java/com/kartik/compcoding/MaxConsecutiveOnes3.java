class MaxConsecutiveOnes3 {
    public int longestOnes(int[] nums, int k) {
        int maxLen = -1, l = 0, r = 0, availableFlips = k;
        Queue<Integer> zeroMarkers = new LinkedList<>();
        while (r < nums.length) {
            // System.out.println("Before: " + " " + l + " " + r);
            if (nums[r] == 0) {
                if (r == 0 || nums[r - 1] == 1) {
                    zeroMarkers.add(r);
                }
                if (availableFlips != 0) {
                    availableFlips--;
                } else {
                    if (r - l > maxLen) {
                        maxLen = r - l;
                    }
                    if (nums[l] == 0) {
                        if (l == 0 || nums[l - 1] == 1) {
                            zeroMarkers.poll();
                        }
                        l++;
                    } else {
                        l = zeroMarkers.poll();
                        l++;
                    }
                }
            }
            r++;
            // System.out.println("After: " + " " + l + " " + r);
            // System.out.println("Zero markers: " + zeroMarkers.toString());
            // System.out.println("Available Flips: " + availableFlips);
            // System.out.println("Maxlen: " + maxLen);
        }
        // System.out.println("Final lengths: " + maxLen + " " + (r - l));
        return Math.max(maxLen, r - l);
    }
}