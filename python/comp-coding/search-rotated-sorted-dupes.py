class Solution:
    def binarySearch(self, arr, t, rev):
        l = 0
        r = len(arr) - 1
        mid = (l + r) // 2
        while l <= r:
            print(mid, l, r)
            if rev:
                if arr[mid] < t:
                    r = mid - 1
                elif arr[mid] > t:
                    l = mid + 1
                else:
                    return True
            else:
                if arr[mid] < t:
                    l = mid + 1
                elif arr[mid] > t:
                    r = mid - 1
                else:
                    return True
                print(mid, l, r)
            mid = (l + r) // 2 
        return False

    def rotatedSearch(self, arr, t):
        l = 0
        r = len(arr) - 1
        mid = (l + r) // 2;
        while l <= r:
            print('one', mid, l, r)
            if arr[mid] < t and arr[r] < t:
                r = mid - 1
            elif arr[mid] < t:
                l = mid + 1
            elif arr[mid] > t and arr[l] > t:
                l = mid + 1
            elif arr[mid] > t:
                r = mid - 1
            else:
                return True
            print('two', mid, l, r)
            mid = (l + r) // 2
        return False    

    def search(self, nums: List[int], t: int) -> bool:
        if len(nums) == 0:
            return False
        elif len(nums) == 1:
            return nums[0] == t
        l = 0
        r = len(nums) - 1
        if nums[l] < nums[r]:
            return self.binarySearch(nums, t, False)
        elif nums[1] < nums[0] and nums[r] < nums[r - 1]:
            return self.binarySearch(nums, t, True)
        else:
            return self.rotatedSearch(nums, t)
                    
        