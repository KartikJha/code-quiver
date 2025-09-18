try:
    n = int(input())
except ValueError:
    print("Invalid value")
    exit(1)

sum = (n * (n+ 1) ) // 2

#print(sum)

if sum % 2 == 0:
    print("YES")

else:
    print("NO")


