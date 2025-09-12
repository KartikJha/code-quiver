try:
    n = int(input())
except ValueError:
    print('Invalid input')
    exit(1)

sum = (n * (n+1)) // 2 

num_list = input()

for i in num_list.split(' '):
    sum -= int(i)
#for i in range(n - 1):
    
    #sum -= 
print(sum)


    
