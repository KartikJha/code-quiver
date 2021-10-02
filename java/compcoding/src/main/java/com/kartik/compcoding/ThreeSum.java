class ThreeSum {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        for (int i = 0; i < nums.length - 2; i++) {
            int j = i + 1, k = nums.length - 1;
            
            if (i != 0 && nums[i] == nums[i - 1]) {
                continue;
            }
            
            while (j < k) {
                if (j != i + 1 && nums[j] == nums[j - 1]) {
                    j++;
                    continue;
                }
                
                if (k != nums.length - 1 && nums[k] == nums[k + 1]) {
                    k--;
                    continue;
                }
                
                if (nums[k] + nums[j] > -1 * nums[i]) {
                    k--;
                } else if (nums[k] + nums[j] < -1 * nums[i]) {
                    j++;
                } else if (nums[k] + nums[i] + nums[j] == 0) {
                    result.add(Arrays.asList(nums[i], nums[j], nums[k]));
                    k--;
                    j++;
                }
            }
        }
        return result;
    }
}