class MinHeap:
	def __init__(self):
		self.arr = [];
	
	def add(self, e):
		self.arr.append(e)
		if len(self.arr) > 1:
			self.bubbleUp(len(self.arr) - 1)

	def remove(self, i):
		last = self.arr.pop()
		if len(self.arr) != 0:
			self.arr[0] = last
		if len(self.arr) > 1:
			self.bubbleDown(0)

	def bubbleDown(self, i):
		lI = 2 * i + 1
		rI = 2 * i + 2
		if lI > len(self.arr) - 1:
			return
		p = self.arr[i]
		l = self.arr[lI]
		r = None
		if rI < len(self.arr):
			r = self.arr[rI]
		sI = -1
		if p > l:
			self.arr[i], self.arr[lI] = self.arr[lI], self.arr[i]
			sI = lI
		if r != None and self.arr[lI] > r:
			self.arr[rI], self.arr[lI] = self.arr[lI], self.arr[rI]
			sI = rI
		if sI != -1:
			self.bubbleDown(sI)	
	
	def bubbleUp(self, i):
		if i < 1:
			return
		pI = (i - 1) // 2
		p = self.arr[pI] 
		[l, r] = self.getLeftAndRight(i)
		if r != None:
			if p > r:
				self.arr[pI], self.arr[i] = self.arr[i], self.arr[pI]
				self.bubbleUp(pI)
			elif l != None and r < l:
				self.arr[i], self.arr[i - 1] = self.arr[i - 1], self.arr[i]
		elif p > l:
			self.arr[pI], self.arr[i] = self.arr[i], self.arr[pI]
			self.bubbleUp(pI)

	def getLeftAndRight(self, i):
		if i % 2 != 0:
			return [self.arr[i], None]
		return [self.arr[i - 1], self.arr[i]]



# minHeap = MinHeap()
# minHeap.add(9)
# minHeap.add(10)
# minHeap.add(8)
# minHeap.add(-1)
# minHeap.add(456)
# minHeap.add(12)
# minHeap.add(13)
# minHeap.remove(0)

# print(minHeap.arr)


