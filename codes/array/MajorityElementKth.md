# Majority Element Kth

## Question

Find the majority element in a given array of size n. The majority element is the element that appears more than ⌊ n/k ⌋ times.

```
Input: arr, n, k
Output: The majority element
```

## Pseudocode

### Brute Force -> `O(n^2)` Time / `O(1)` Space

```
int majorityElement(nums, n, k)
    majority_count = floor(n / k)
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
int majorityElement(nums, n, k)
    majority_count = floor(n / k)
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
int majorityElement(nums, n, k)
    majority_count = floor(n / k)
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

### Extended Boyer-Moore Voting Algo -> `O(nk)` Time / `O(k)` Space

```
int majorityElement(nums, n, k)
    candidates = arr_size_k-1_init_none

    counts = arr_size_k-1_init_0

    foreach num in nums do
        found = False
        foreach i in k-1 do
            if candidates[i] == num do
                found = True
                counts[i] +=1
                break
            end
        end
        if found == True do
            continue
        end
        foreach i in k-1 do
            if counts[i] == 0 do
                counts[i] += 1
                candidates[i] = num
                break
            end
        end
        if found == True do
            continue
        end
        foreach i in k-1 do
            counts[i] -= 1
        end
    end

    counts = arr_size_k-1_init_0

    foreach num in nums do
        foreach i in k-1 do
            if candidates[i] == num do
                counts[i] +=1
                break
            end
        end
    end

    foreach i in k-1 do
        if counts[i] > majority_count do
            return candidates[i]
        end
    end

    return None
```
