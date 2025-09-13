try:
    seq = input()
except ValueError:
    print("Invalid values")
    exit(1)

ml = 0
cl = 1
startc = seq[0]

for i in range(1, len(seq)):
    cc = seq[i]
    if cc == startc:
        cl += 1
    else:
        startc = cc
        ml = max(ml, cl)
        cl = 1
        #ml = max(ml, cl)

print(max(ml, cl))


