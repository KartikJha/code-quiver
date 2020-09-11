def getHint(self, secret: str, guess: str) -> str:
        numIndexMap = {}
        for i in range(len(secret)):
            c = secret[i]
            if c in numIndexMap:
                numIndexMap[c].append(i)
            else:
                numIndexMap[c] = [i]
        numList = list(numIndexMap)
        cow = 0
        b = 0
        seenGuessIndex = {}
        # find all the bulls 
        for n in numList:
            iArr = []
            for i in numIndexMap[n]:
                if guess[i] == n:
                    b += 1
                    seenGuessIndex[i] = True
                else:
                    iArr.append(i)
            numIndexMap[n] = iArr
        # cows
        for i in range(len(guess)):
            c = guess[i]
            if c in numIndexMap and i not in seenGuessIndex and len(numIndexMap[c]) != 0:
                cow += 1
                numIndexMap[c].pop()
        return str(b) + 'A' + str(cow) + 'B'