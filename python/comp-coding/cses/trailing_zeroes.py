try:
    n = int(input())
except ValueError:
    print("Invalid input")
    exit(1)

def fact(n):
    if n == 1:
        return n
    return fact(n-1) * n

#f = str(fact(n))

#f = 1

#for i in range(n, 0, -1):
    f *= i

#f = str(f)
#print(f, len(f))

z_c = 0
power_of_5 = 5
while power_of_5 <= n:
    z_c += (n//power_of_5)
    power_of_5 *= 5
#for i in range(len(f) - 1, -1, -1):
#   if int(f[i]) == 0:
#        z_c += 1
 #   else:
  #      print(z_c)
   #     exit(0)

print(z_c)


