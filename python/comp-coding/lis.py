def lis(arr):
	n = len(arr)
	l = [1] * n
	for i in range(1, n):
		for j in range(0, i):
			if arr[j] < arr[i]:
				l[i] = max(l[j] + 1, l[i])
	return max(l)

arr = [10 , 22 , 9 , 33 , 21 , 50 , 41 , 60] 
print ("Length of lis is ", lis(arr))