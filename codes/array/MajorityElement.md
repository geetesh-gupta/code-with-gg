# Majority Element

## Question

Find the majority element in a given array of size n. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

```
Input: arr, n
Output: The majority element
```

## Pseudocode

### Brute Force -> `O(n^2)` Time / `O(1)` Space

```
int majorityElement(nums, n)
    majority_count = n / 2
    foreach num in nums do
        count = 0
        foreach elem in nums do
            if elem == num do
                count += 1
            end
            if count > majority_count do
                return num
            end
        end
    end
    return None
```

### Hashing -> `O(n)` Time / `O(n)` Space

```
int majorityElement(nums, n)
    hashmap = empty_map_init_0
    foreach num in nums do
        hashmap[num] += 1
            if count > majority_count do
                return num
            end
        end
    end
    foreach key in hashmap do
        if hashmap[key] > floor(n/2) do
            return hashmap[key]
        end
    end
    return None
```

### Sorting -> `O(n logn)` Time / `O(1)` [inPlaceSort] or `O(n)` Space

```
int majorityElement(nums, n)
    sort(nums)
    return nums[floor(n/2)]
```

### Boyer-Moore Voting Algo -> `O(n)` Time / `O(1)` Space

```
int majorityElement(nums, n)
    count = 0
    candidate = None

    foreach num in nums do
        if count == 0 do
            candidate = num
        end
        if num == candidate do
            count += 1
        else do
            count -= 1
        end
    end
    return candidate
```

## References

- [Leetcode](https://leetcode.com/problems/majority-element/solution/)
- [GeeksForGeeks](https://www.geeksforgeeks.org/majority-element/)
- [InterviewBit](https://www.interviewbit.com/problems/majority-element/)
- [Educative](https://www.educative.io/edpresso/how-to-find-the-majority-element-in-an-array)