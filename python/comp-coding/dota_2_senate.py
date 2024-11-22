from collections import deque

class Solution:
    def ban_next(self, i: int, senate_state_list: list, s: str) -> list:
        get_ban_target = {"R": "D", "D": "R"}
        
        if senate_state_list[i]:
            return senate_state_list
        
        for j, c in enumerate(s):
            if j == i :
                continue
            target = get_ban_target[s[i]]
            print(senate_state_list)
            print(j)
            print(c)
            print(target)
            banned = senate_state_list[j]

            if c == target and not banned:
                senate_state_list[j] = True
                return senate_state_list
        return senate_state_list
    
    def predictPartyVictory(self, senate: str) -> str:
        senate_state_list = [False] * len(senate)
        # victory = False
        remaining_radiants = []
        remaining_dires = []

        print(senate_state_list)
        
        while True:
            for i, c in enumerate(senate):
                senate_state_list = self.ban_next(i, senate_state_list, senate)
            
            remaining_dires = [i for i, c in enumerate(senate) if c == "D" and not senate_state_list[i]]
            remaining_radiants = [i for i, c in enumerate(senate) if c == "R" and not senate_state_list[i]]
            
            # remaining_radiants = [r for i, ]
            # remaining_dires = []

            if len(remaining_radiants) == 0:
                if len(remaining_dires) != 0:
                    return "Dire"
            
            if len(remaining_dires) == 0:
                if len(remaining_radiants) != 0:
                    return "Radiant"
        
    def predictPartyVictoryQueueBased(self, senate: str) -> str:
        radiant_q = deque()
        dire_q = deque()
        
        for i, c in enumerate(senate):
            if c == "R":
                radiant_q.append(i)
            else:
                dire_q.append(i)
        while radiant_q and dire_q:
            radiant_index = radiant_q.popleft()
            dire_index = dire_q.popleft()

            if radiant_index < dire_index:
                radiant_q.append(radiant_index + len(senate))
            else:
                dire_q.append(dire_index + len(senate))
        if radiant_q:
            return "Radiant"
        return "Dire"
        # return senate
sol = Solution()

# print(sol.predictPartyVictory("RDD"))
# print(sol.predictPartyVictory("DRRDRDRDRDDRDRDR"))
print(sol.predictPartyVictoryQueueBased("DRRDRDRDRDDRDRDR"))
