class Solution:
    def maximumSubarraySum(self, nums: List[int], k: int) -> int:
        q = deque()
        i = 0
        maxsum, add = 0, 0
        s = set()

        while i < len(nums):
            q.append(nums[i])
            s.add(nums[i])
            add += nums[i]
            if len(q) == k:
                if len(q) == len(s):
                    maxsum = max(add, maxsum)
                    a = q.popleft()
                    s.remove(a)
                    add -= a
                    i += 1
                else:
                    q = deque()
                    s = set()
                    add = 0
            else:
                i += 1

        return maxsum

