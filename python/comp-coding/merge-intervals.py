def has(l, e):
    if e >= l[0] and e <= l[1]:
        return 0
    if e < l[0]:
        return -1
    return 1

class Solution:
    def insert(self, intervals, newInterval):
        N = []
        ans = []
        i = 0
        
        if len(intervals) == 0:
            if len(newInterval) == 0:
                return []
            else:
                return [newInterval]
        elif len(newInterval) == 0:
            return intervals
        
        for i in range(len(intervals)):
            cI = intervals[i]
            if len(N) == 0:
                pos = has(cI, newInterval[0])
                if pos == 0:
                    N.append(cI[0])
                    if has(cI, newInterval[1]) == 0:
                        N.append(cI[1])
                        ans.append(N)
                        break
                elif pos == -1:
                    N.append(newInterval[0])
                    if has(cI, newInterval[1]) == -1:
                        N.append(newInterval[1])
                        ans.append(N)
                        ans.append(cI)
                        break
                    elif has(cI, newInterval[1]) == 0:
                        N.append(cI[1])
                        ans.append(N)
                        break
                else: 
                    if i == len(intervals) - 1:
                        N = newInterval
                        ans.append(cI)
                        ans.append(N)
                    else:
                        ans.append(cI)
            else:
                pos = has(cI, newInterval[1])
                if pos == 0:
                    N.append(cI[1])
                    ans.append(N)
                    break
                elif pos == -1:
                    N.append(newInterval[1])
                    ans.append(N)
                    ans.append(cI)
                    break
                else:
                    if i == len(intervals) - 1:
                        N.append(newInterval[1])
                        ans.append(N)
        if len(N) == 1:
            if intervals[-1][1] < newInterval[1]:
                N.append(newInterval[1])
            else: 
                N.append(intervals[-1][1])
            ans.append(N)
            
        if i == len(intervals) - 1:
            return ans
        
        for j in range(i + 1, len(intervals)):
            ans.append(intervals[j])
        return ans