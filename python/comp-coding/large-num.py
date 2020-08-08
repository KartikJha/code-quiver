def getUIString(num):
	fraction = num - int(num)
	numS = str(int(num))
	thousandFlag = False
	window = 0
	result = []
	print(fraction, numS)
	for i in range(len(numS) - 1, -1, -1):
		print("result state", result, numS[i], window)
		if window == 2 and thousandFlag:
			result.append(',')
			window = 1
		elif window == 3 and not thousandFlag:
			result.append(',')
			window = 1
			thousandFlag = True
		else:
			window = window + 1
		result.append(numS[i])
	if fraction > 0:
		result.append(str(fraction))
	result.reverse()
	return ''.join(result)

inputS = float(input("Target num"))

print(getUIString(inputS))