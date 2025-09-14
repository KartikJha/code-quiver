from collections import deque

try:
    n = int(input())
except ValueError:
    print("Invalid input")
    exit(1)

result = [0] * n
empty_indices = deque([i for i in range(0, n)], maxlen=n)
candidate_indices = []

def place_i(idx, arr, ele):
    if idx == 0:
        if idx + 1 == 0:
            arr[idx] = ele
            return True
        elif abs(ele - arr[idx + 1]) == 1:
            return False
        else:
            arr[idx] = ele
            return True
    elif idx == len(arr) - 1:
        if idx - 1 == 0:
            arr[idx] = ele
            return True
        elif abs(ele - arr[idx - 1]) == 1:
            return False
        else:
            arr[idx] = ele
            return True
    else:
        if idx - 1 == 0 and  idx + 1 == 0:
            arr[idx] = ele
            return True
        elif idx - 1  == 0:
            if abs(ele - arr[idx + 1]) == 1:
                return False
            else:
                arr[idx] = ele
                return True
        elif idx + 1 == 0:
            if abs(ele - arr[idx - 1]) == 1:
                return False
            else:
                arr[idx] = ele
                return True
        
        else:
            if abs(ele  -  arr[idx + 1]) == 1 or abs(ele  -  arr[idx - 1]) == 1:
                return False
            else:
                arr[idx] = ele
                return True




for i in range(n+1):
    ei = empty_indices.popleft()
    #candidate_indices.append(ei)
 
    while not place_i(ei, result, i):
        candidate_indices.append(ei)
        if not empty_indices:
            print("NO SOLUTION")
            exit(0)
        ei = empty_indices.popleft()
    empty_indices.extendleft(reversed(candidate_indices))
    
print(result)

