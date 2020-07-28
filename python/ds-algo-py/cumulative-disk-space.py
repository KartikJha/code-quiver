import os

def getCumSize(path):
	total = os.path.getsize(path)
	if os.path.isdir(path):
		print('Hello')
		for f in os.listdir(path):
			if os.path.isdir(f):
				total = total + getCumSize(os.path.join(path, f))
			else:
				total = total + os.path.getsize(os.path.join(path, f))
	print('{0:<7}'.format(total), path)
	return total

print(getCumSize(input("Enter path")))
