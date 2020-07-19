"""
sequence disjointness
"""
def areDisjoint(a, b, c):
	for i in a:
		if i in b and i in c:
			return False
	return True
n = 3
seq = []
while n > 0:
	seq.append(input().split(' '))
	n -= 1
print(areDisjoint(seq[0], seq[1], seq[2]))
