def generate_subsets(arr):
    result_set = [[]]
    
    print('starting subset generation')

    generate_subsets_recursively({
        'remaining': arr,
        'type': 'exclude',
        'resultset': result_set,
        'set': []
    });

    print('subsets generated')
    #if len(arr) == 0:
     #   return []
    #included_subset = [arr[0]]
   # excluded_subset = []
    #rest_of_the_subsets = generate_subsets(arr[1:])
    #return [included_subset, generate_subsets(arr[1:])]
    #return [
    
    return result_set

def generate_subsets_recursively(obj):
    if obj['type'] == 'include':
        obj['resultset'].push(obj['set'])
    
    first_ele = obj['remaining'][0] 
    
    generate_subsets_recursively({
        'remaining': obj['remaining'][1:],
        'type': 'exclude',
        'resultset': obj['resultset'],
        'set': obj['set']
    });
    
    obj['set'].append(first_ele)

    generate_subsets_recursively({
        'remaining': obj['remaining'][1:],
        'type': 'include',
        'resultset': obj['resultset'],
        'set': obj['set']
    });




print(generate_subsets([4, 5, 3, 8, 12]))


