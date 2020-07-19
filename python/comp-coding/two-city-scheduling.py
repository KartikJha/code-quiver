def twoCitySchedCost(costs):
	totalCost = 0
	costTupleList = []
	for i in range(len(costs)):
			cost = costs[i]
			costTupleList.append((cost[0], cost[1], i))
	sortedACosts = sorted(costTupleList, key=lambda items: items[0])
	sortedBCosts = sorted(costTupleList, key=lambda items: items[1])
	a = len(costs) // 2
	b = len(costs) // 2
	print(sortedACosts)
	print(sortedBCosts)
	print(a)
	print(b)
	visited = {}
	for i in range(len(costs)):
			aLowCost = sortedACosts[i]
			bLowCost = sortedBCosts[i]
			if aLowCost[2] == bLowCost[2] and aLowCost[2] not in visited:
					cost = aLowCost
					if (min(cost[0], cost[1]) == cost[0] and a > 0) or b == 0:
							a = a - 1
							totalCost = totalCost + cost[0]
					else:
							b = b - 1
							totalCost = totalCost + cost[1]
					visited[aLowCost[2]] = True
			elif a > 0 and b > 0:
					if (aLowCost[2] not in visited) and (bLowCost[2] not in visited):
							if (aLowCost[0] + bLowCost[1]) < (aLowCost[1] + bLowCost[0]):
									totalCost = aLowCost[0] + bLowCost[1] + totalCost
							else:
									totalCost = aLowCost[1] + bLowCost[0] + totalCost
							a = a - 1
							b = b - 1
							visited[aLowCost[2]] = True
							visited[bLowCost[2]] = True
					elif (aLowCost[2] not in visited):
							totalCost = totalCost + aLowCost[0]
							a = a - 1
							visited[aLowCost[2]] = True
					elif (bLowCost[2] not in visited):
							totalCost = totalCost + bLowCost[1]
							b = b - 1   
							visited[bLowCost[2]] = True
			elif a > 0 and aLowCost[2] not in visited:
					totalCost = totalCost + aLowCost[0]
					a = a - 1
					visited[aLowCost[2]] = True
			elif b > 0 and bLowCost[2] not in visited:
					totalCost = totalCost + bLowCost[1]
					b = b - 1   
					visited[bLowCost[2]] = True
			else:
				break
	print(a)
	print(b)
	return totalCost
# Test 1
# print(twoCitySchedCost([[10,20],[30,200],[400,50],[30,20]]))

# Test 2
print(twoCitySchedCost([[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]))