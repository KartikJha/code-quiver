def recursiveFact(n):
	if n < 3:
		return n
	return n * recursiveFact(n - 1)
n = int(input())
print(recursiveFact(n))