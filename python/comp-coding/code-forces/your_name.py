t = int(input())


while t > 0:
    #print(t)
    s = input()
    line = input().split(' ')
    #print(s)
#    print(line)
    first = line[0]
    second = line[1]
    t -= 1 
#    print(t)
    if len(first) != len(second):
        print('NO')
        continue

    count_for_char = { 'f': {}, 's': {} }
    
    char_set_first = set()
    char_set_second = set()

    for c in first:
        #print(count_for_char['f'][c])
        if count_for_char['f'].get(c):
            count_for_char['f'][c] += 1
        else:
            count_for_char['f'][c] = 1
        char_set_first.add(c)
    
    #print(char_set_first)
    
    flag = False
    for c in second:
        if c not in char_set_first:
            print('NO')
            flag = True
            break
        if count_for_char['s'].get(c):
            count_for_char['s'][c] += 1
        else:
            count_for_char['s'][c] = 1
        char_set_second.add(c)
    
    if flag:
        continue

    if len(char_set_second) != len(char_set_first):
        print('NO')
        flag = True
        continue

   # if flag:
    #    break
   
#    print(char_set_second)
 #   print(char_set_first)

    ctr = 0
    for c in char_set_second:
        if count_for_char['s'][c] != count_for_char['f'][c]:
            print('NO')
            break
        else:
            ctr += 1
                
    if ctr == len(char_set_second):
        print('YES')
    #else:
     #   print('NO')

    #i = 1
    #t -= 1
    #for i in range(1, len(line)):
     #   if first != line[i]:
      #      print('NO')
       #     break
    #print(i)    
    #if i == len(line) - 1:
     #  print('YES')
    #else:
     #  print('NO')
    #t -= 1
#print(t)
#print('Codeforces div 4 2025 startup !!!! ' )


