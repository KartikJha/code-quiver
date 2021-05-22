class Solution:
    def countBinarySubstrings(self, s: str) -> int:
        if len(s) == 1:
            return 0
        cB = s[0]
        currL = 1
        bufferL = 0
        count = 0
        for i in range(1, len(s)):
            if s[i] == cB:
                currL += 1
            else:
                count += min(currL, bufferL)
                bufferL = currL
                cB = s[i]
                currL = 1
        count += min(bufferL, currL)
        return count
inS = input()
print(Solution().countBinarySubstrings(inS))