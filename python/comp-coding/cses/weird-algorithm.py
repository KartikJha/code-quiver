try:
    n = int(input())
    if n < 1 or n > 10**6:
        raise ValueError("Input must be between 1 and 10^6.")
except ValueError:
    print("Please enter a valid integer.")
    exit(1)

print(n, end=' ')
while n != 1:
    if n % 2 == 0:
        n //= 2
    else:
        n = 3 * n + 1
    print(n, end=' ')