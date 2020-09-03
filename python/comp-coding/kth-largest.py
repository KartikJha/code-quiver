from lib.MinHeap import MinHeap

class Solution:
	def findKthLargest(self, nums, k):
		# minheap = MinHeap()
		# for e in nums:
		# 	if len(minheap.arr) == k:
		# 		if e > minheap.arr[0]:
		# 			minheap.remove(0)
		# 			minheap.add(e)
		# 	else:
		# 		minheap.add(e)
		# return minheap.arr[0]
		l = 0
		h = len(nums) - 1
		p = self.quickSelect(l, h, nums)
		while p != k:
			if p < k:
				l = p + 1
				p = self.quickSelect(l, h, nums)
			else:
				h = p - 1
				p = self.quickSelect(l, h, nums)
		return nums[p]

	def quickSelect(self, low, high, nums):
		i = low - 1
		for j in range(low, high + 1):
			if nums[j] > nums[high]:
				i = i + 1
				nums[i], nums[j] = nums[j], nums[i]
		nums[i + 1], nums[high] = nums[high], nums[i + 1]
		return i + 1




sol = Solution()
print(sol.findKthLargest([3,2,3,1,2,4,5,5,6,7,7,8,2,3,1,1,1,10,11,5,6,2,4,7,8,5,6], 20))
