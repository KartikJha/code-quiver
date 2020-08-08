def quicksort(arr, low, high):
	if (low < high):
		p = partition(arr, low, high)
		quicksort(arr, low, p - 1)
		quicksort(arr, p + 1, high)

def partition(arr, low, high):
	i = low - 1
	for j in range(low, high + 1):
		if arr[j] < arr[high]:
			i = i + 1
			arr[i], arr[j] = arr[j], arr[i]
	arr[i + 1], arr[high] = arr[high], arr[i + 1]
	return i + 1

arr = [4, 2, 3, 1, 7, 6]
quicksort(arr, 0, len(arr) - 1)
print(arr)