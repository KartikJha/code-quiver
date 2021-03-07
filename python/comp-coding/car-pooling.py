def carPooling(trips, capacity):
        """
        :type trips: List[List[int]]
        :type capacity: int
        :rtype: bool
        """
        sortedTrips = sorted(sorted(trips, key=lambda items: items[2]), key=lambda items: items[1])
        dropOffMap = {}
        cCap = capacity
        dropOffArray = []
        for t in sortedTrips:
            # if t[1] in dropOffMap:
            #     cCap = cCap + dropOffMap[t[1]]
            # else:
            mapItems = list(dropOffMap.items())
            removableIndices = []
            for i in range(len(mapItems)):
                e = mapItems[i]
                if e[0] != -1 and e[0] <= t[1]:
                    cCap = cCap + e[1]
                    mapItems[i] = (-1, 0)
            dropOffMap = dict(mapItems)
            if cCap < t[0]:
                return False
            cCap = cCap - t[0]
            if t[2] in dropOffMap:
                dropOffMap[t[2]] = dropOffMap[t[2]] + t[0]
            else:
                dropOffMap[t[2]] = t[0]
                dropOffArray.append(t[2])     
        return True