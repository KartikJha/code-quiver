def printLine(n):
	print("-" * n)
def printInterval(n):
	if n > 0:
		printInterval(n - 1)
		printLine(n)
		printInterval(n - 1)
def getRuler(majorTickLength, rulerSize):
	for i in range(1, rulerSize + 1):
		printInterval(majorTickLength - 1)
		printLine(majorTickLength)
tL = int(input())
n = int(input())
getRuler(tL, n)