# Coin Change 2

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

- We will assign coins(+ 0) as rows and 0 <= x <= amount on columns.
- At every step we have a choice to include a particular coin or not.
- Hence total possible ways will be the summation of both.
- If we include the coin, reduce the amount by the value of coin.
- Else take another coin and keep the amount same.

`Note: We can include the coin only if the value of coin is less than the amount.`

Base Condition :

Input: amount = 0
Output: 1

Input: coin = 0
Output: 0

```
    dp[0][j] = 0    // for each j in [0,amount]
    dp[i][0] = 1    // for each i in coins array
```

DP Relation

```
    dp[i][j] = dp[i][j-coin[i-1]] + dp[i-1][j]      // Value of coin[i-1] is less than amount
    dp[i][j] = dp[i-1][j]                           // Value of coin[i-1] is greater than amount
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

Base Condition :

Input: coin = 0
Output: 0

Input: amount = 0
Output: 1

```
    dp[i] = 0       // for each i in [0,amount]
    dp[0] = 1       // since amount 0 is always possible
```

DP Relation

```
    dp[i] = dp[i-coin[j]] + dp[i]
```

### Solutions

DP based solution

```cpp
int change(int amount, vector<int>& coins) {

    // Initialize dp array to zero -- Base Condition 1
    vector<int> dp(amount+1, 0);

    // Set index 0 to 1  -- Base Condition 2
    dp[0] = 1;

    for(int i=0;i<coins.size();i++){
        for(int j = coins[i]; j <= amount; j++){
            dp[j] += dp[j-coins[i]];
        }
    }

    return dp[amount];
}
```
