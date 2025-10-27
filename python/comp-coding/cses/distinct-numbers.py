try:
    n = int(input())
except ValueError:
    print("Invalid value")
    exit(1)

s_s_n = input()

s_s_n_a = s_s_n.split(' ')

n_set = set()

for n in s_s_n_a:
    n_set.add(n)

print(len(n_set))


