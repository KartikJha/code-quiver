def prefix_avg(l, n):
	if l.__len__ == 0:
		return 0
	avg = []
	avg.append(int(l[0]))
	for i in range(1, n):
		avg.append((int(avg[i - 1]) + int(l[i])) / (int(i) + 1))
	return avg

n = int(input()) # size of list
l = input().split(' ')
print(prefix_avg(l, n))