try:
    n = int(input())
except ValueError:
    print("Invalid Input")
    exit(1)

modulo = 10**9 + 7

bit_s = 2**n

print(bit_s % modulo)


