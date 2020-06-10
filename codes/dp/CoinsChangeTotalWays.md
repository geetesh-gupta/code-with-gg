# Coin Change 2 - [Leetcode(#518)](https://leetcode.com/problems/coin-change-2/)

### Question

Find the total no. of possible ways to form up a certain amount from given coins.

```
Input: target amount, array of coins
Output: No. of different combinations possible
```

#### Example :

```
Input: amount = 5, coins = [1, 2, 5]
Output: 4
```

Explanation : `[1, 1, 1, 1, 1], [1, 1, 1, 2], [1, 2, 2], [5]`

---

### DP Concept: Space-Complexity - O(N\*M)

- We will assign coins as rows and 0 <= x <= amount on columns.
- Also, we will have an extra row of coin value "0".
- At every step we have a choice to include a particular coin or not.
- Hence total possible ways will be the summation of both.
- If we include the coin, reduce the amount by the value of coin.
- Else take another coin and keep the amount same.

`Note: We can include the coin only if the value of coin is less than the amount.`

### Pseudocode
```i stands for coin array iterator and j for [0,amount]```

Base Condition :
```
Input: i = 0 
Output: 0

Input: j = 0
Output: 1

Input: i = 0 and j = 0
Output: 1
```
Choice Diagram

```
    if coin[i-1] < j do
        1. (i,j-coin[i-1]) + (i-1,j)
    else do
        2. (i-1,j)
```
DP
```
    int coinChange(int coin[n], int amount) {
        coin.sort()
        dp[n+1][amount+1]
        
        forEach i in [0,n] do
            forEach j in [0,amount] do
                // Base Conditions
                if i*j = 0 do
                    if i=0 and j=0
                        dp[i][j] = 1
                    else if i=0 do
                        dp[i][j] = 0
                    else do
                        dp[i][j] = 1
                    end
                    
                // Choice Diagram
                else
                    if coin[i-1] < j do
                        dp[i][j] = dp[i][j-coin[i-1] + dp[i-1][j]
                    else do
                        dp[i][j] = dp[i-1][j]
                    end
                end
            end    
        end 
        return dp[n][amount]
    }
```
### Solutions

DP based solution

```cpp
int coinChange(vector<int> coins, int amount) {
    sort(coins.begin(),coins.end());
    int n = coins.size();
    vector<vector<int>> dp(n+1,vector<int>(amount+1));

    // Base Condition
    for(int i=0;i<=n;i++){
        dp[i][0] = 1;
    }
    for(int i=1;i<=amount;i++){
        dp[0][i] = 0;
    }

    // Build Table
    for(int i=1;i<=n;i++){
        for(int j=1;j<=amount;j++){
            if(j>=coins[i-1]){
                // amount is greater than coin's value, hence included
                dp[i][j] = dp[i][j-coins[i-1]] + dp[i-1][j];
            }
            else{
                // amount is lesser than coin's value, hence not included
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    return dp[n][amount];
}
```

---

#### DP Concept: Space-Complexity - O(N)

- We will use only a vector with 0 <= x <= amount. (Initialized at 0)
- Since we were using previous and upper value to calculate we can shrink the table to a single row only.
- Other conditions remain same for this as above.
- We will loop over for each coin.

### Pseudocode
```i stands for the iterator over [0,amount] and j stands for iterator over coin array```

Base Condition :
```
Input: j = 0
Output: 0

Input: i = 0
Output: 1
```
Choice Diagram
```
   if i < coin[j] do
        1. 0
   else do
        2. dp[i] + dp[i-coin[j]]
```
DP
```
    int coinChange(int coin[n], int amount) {
        // Initialize Array to 0 --- Base Condition 1
        dp[amount+1] = {0}
        
        // Set index 0 to 1 --- Base Condition 2
        dp[0] = 1
        
        // Choice Diagram
        forEach j in [0,n] do
            forEach i in [0,amount] do
                if i >= coin[j] do
                    dp[i] = dp[i] + dp[i-coin[j]]
                end
            end
        end
        return dp[amount]
    }
```
### Solutions

DP based solution

```cpp
int coinChange(vector<int> coins, int amount) {

    // Initialize dp array to zero -- Base Condition 1
    vector<int> dp(amount+1, 0);

    // Set index 0 to 1  -- Base Condition 2
    dp[0] = 1;

    for(int j=0;j<coins.size();j++){
        for(int i = coins[j]; i <= amount; i++){
            dp[i] += dp[i-coins[j]];
        }
    }

    return dp[amount];
}
```
