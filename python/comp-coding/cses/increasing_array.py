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
# this block below is unoptimized, we can just use the difference of pv and n to count the min_moves instead of sequentially going through each increment :)    
    if n < pv:
        min_moves += (pv - n)
        n = pv
   # one more mistake, the n becomes the pv if there are updates 
    #while n < pv:
     #   min_moves += 1
      #  n += 1
    pv = n

print(min_moves)





