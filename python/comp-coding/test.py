#words = ["apple", "banana", "apple", "orange", "banana", "apple"]
 
#output : [['apple', 'apple', 'apple'], ['banana', 'banana'], ['orange']]

data = {
    "a": 1,
    "b": {
        "c": 2,
        "d": {
            "e": 3
        }
    }
}
 
#OUTPUT
#{
 #   "a": 1,
  #  "b.c": 2,
   # "b.d.e": 3
#}
#<class 'int'>

[['a', 1], [['b.c', 2], ['b.d.e', 3]]]

def flatten_recursive(root, prefix = ''):
    
    print(prefix + ' ')

    nL = len(root)
    
    if nL == 1:
    
        nK = ''
        nV = 0
        for n in root:
            nK = n
            nV = root[n]
#            print("Reached" + type(nV))
        if type(nV) == type(1):
            return [prefix, nV]

    r_s = []

    for node in root:

        if prefix:
            prefix = prefix + '.' + node
        else:
            prefix = node
        e_node = {}
        e_node[node] = root[node]
        r_s.append(flatten_recursive(e_node, prefix))
    return r_s

flatten_recursive(data, '')




#wC = {}

#for w in words:
 #   cC = wC.get(w)

  #  if not cC:
   #     wC[w] = 1
  #  else:
 #       wC[w] = cC + 1

#r_s = []

#for e in wC:
 #   c = wC[e]
#
   # r_s.append([e] * c)

    #print(e)
#print(r_s)


