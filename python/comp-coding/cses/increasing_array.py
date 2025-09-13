try:
    n = input()
except ValueError:
    print(' ')
    exit(1)

min_moves = 0

seq = input()

#print(seq)

seq = seq.split(' ')

pv = int(seq[0])


for i in range(1, len(seq)):
    n = int(seq[i])
    
    while n < pv:
        min_moves += 1
        n += 1
    
    pv = n

print(min_moves)





