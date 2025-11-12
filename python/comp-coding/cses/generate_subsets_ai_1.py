def generate_subsets(arr):
    result_set = [[]]
    
    print('starting subset generation')

    generate_subsets_recursively({
        'remaining': arr,
        'type': 'exclude',
        'resultset': result_set,
        'set': []
    })  # Changed semicolon to parenthesis

    print('subsets generated')
    
    return result_set

def generate_subsets_recursively(obj):
    # Base case: if no elements remaining, add the current set to results
    
    if len(obj['remaining']) == 0:
        if obj['type'] == 'include':
            obj['resultset'].append(obj['set'].copy())  # Changed push to append, added copy()
        return
    
    first_ele = obj['remaining'][0] 
    
    # Exclude the first element
    generate_subsets_recursively({
        'remaining': obj['remaining'][1:],
        'type': 'exclude',
        'resultset': obj['resultset'],
        'set': obj['set'].copy()  # Added copy() to avoid mutation issues
    })
    
    # Include the first element
    new_set = obj['set'].copy()  # Create a copy first
    new_set.append(first_ele)
    
    generate_subsets_recursively({
        'remaining': obj['remaining'][1:],
        'type': 'include',
        'resultset': obj['resultset'],
        'set': new_set
    })


print(generate_subsets([4, 5, 3, 8, 12]))
