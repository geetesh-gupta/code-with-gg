# Majority Element One Third

## Question

Find the majority element in a given array of size n. The majority element is the element that appears more than ⌊ n/3 ⌋ times.

```
Input: arr, n
Output: The majority element
```

## Pseudocode

### Brute Force -> `O(n^2)` Time / `O(1)` Space

```
int majorityElement(nums, n)
    majority_count = floor(n / 3)
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
    majority_count = floor(n / 3)
    hashmap = empty_map_init_0
    foreach num in nums do
        hashmap[num] += 1
    end
    foreach key in hashmap do
        if hashmap[key] > majority_count do
            return hashmap[key]
        end
    end
    return None
```

### Sorting -> `O(n logn)` Time / `O(1)` [inPlaceSort] or `O(n)` Space

```
int majorityElement(nums, n)
    majority_count = floor(n / 3)
    sort(nums)
    candidate = None
    count = 0
    foreach num in nums do
        if candidate == num do
            count += 1
            if count > majority_count do
                return candidate
            end
        else
            candidate = num
            count = 1
        end
    end
    return None
```

### Boyer-Moore Voting Algo -> `O(n)` Time / `O(1)` Space

```
int majorityElement(nums, n)
    candidate1 = None
    candidate2 = None

    count1 = 0
    count2 = 0

    foreach num in nums do
        if candidate1 == num do
            count1 +=1
        else if candidate2 == num do
            count2 += 1
        else if count1 == 0 do
            count1 += 1
            candidate1 = num
        else if count2 == 0 do
            count2 += 1
            candidate2 = num
        else
            count1 -= 1
            count2 -= 1
        end
    end

    count1 = 0
    count2 = 0

    foreach num in nums do
        if candidate1 == num do
            count1 += 1
        else candidate2 == num do
            count2 += 1
    end

    if count1 > majority_count do
        return candidate1
    else if count2 > majority_count do
        return candidate2
    end

    return None
```

## References

- [Leetcode](https://leetcode.com/problems/majority-element-ii/)
- [GeeksForGeeks](https://www.geeksforgeeks.org/n3-repeated-number-array-o1-space/)
