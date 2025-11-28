n = int(input())

nums = input().split(' ')

m_l = 1
c_l = 1
#start = nums[0]
s_i = 0
while s_i < len(nums):
    start = int(s_i)
    for j in nums[s_i + 1:]:
    #for i in nums[
        curr = int(j)
        if curr >= start:
            if m_l < c_l:
                m_l = c_l
            #s_i += c_l
            break
        else:
            c_l += 1
    s_i += c_l
    c_l = 1
print(m_l)


    


