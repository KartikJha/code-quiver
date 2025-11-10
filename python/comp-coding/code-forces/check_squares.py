t = int(input())


while t > 0:
    line = input().split(' ')
    #print(line)
    first = line[0]
    i = 1
    t -= 1
    flag = False
    for i in range(1, len(line)):
        if first != line[i]:
            print('NO')
            flag = True
            break
    #print(i)    
    if not flag:
       print('YES')
    #else:
     #  print('NO')
    #t -= 1

#print('Codeforces div 4 2025 startup !!!!')


