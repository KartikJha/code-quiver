import math

def isPrime(n):
	for i in range(2, ceil(sqrt(n))):
		if n % i == 0:
			return False
	return True

def getLargestPrime(n):
	print(type(n))
	for i in range(ceil(sqrt(n)), 1, -1):
		print(i)
		if isPrime(i):
			print(i)
			return i
	return 1
		
n = int(input("Target value:"))
print(getLargestPrime(n))
print(isPrime(2))
print(isPrime(13))
print(isPrime(24))