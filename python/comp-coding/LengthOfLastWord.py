class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        start = len(s) - 1
        e = -1
        while start > -1 and (s[start] != ' ' or e == -1):
            if s[start] != ' ' and e == -1:
                e = start
            start -= 1
        return e - start
s = Solution()
print(s.lengthOfLastWord('Hello World'))