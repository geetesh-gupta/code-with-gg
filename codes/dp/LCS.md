# Longest Common Subsequence
### Question
Find the length of the longest common subsequence between two strings
```
Input: str1, str2, m, n
Output: Length of longest common subsequence
```

### Pseudocode
Base Condition
```
    Input:  m=0 or n=0
    Output: 0
```

Choice Diagram
```
    if str1[m-1] = str2[n-1] do 
        1. 1 + (m-1, n-1)
    else
        2. MAX {(m-1, n) or (m, n-1)}
    end
```
 
Recursive
```
    int lcseq(string str1, string str2, int m, int n){
        // Base Condition
        if m=0 or n=0 do 
            return 0
        end
    
        // Choice Diagram
        if str1[m-1] = str2[n-1] do 
            return 1 + lcseq(str1, str2, m-1, n-1)
        else
            return max (lcseq(str1, str2, m-1, n), lcseq(str1, str2, m, n-1))
        end
    }
```

DP
```
    int lcseq(string str1, string str2, int m, int n){
        matrix[m+1][n+1]
    
        foreach i in m+1 do 
            foreach j in n+1 do 
                // Base Condition
                if m=0 or n=0 do 
                    matrix[i][j] = 0
                    continue
                end
    
                // Choice Diagram
                if str1[m-1] = str2[n-1] do 
                    matrix[i][j] = 1 + matrix[m-1][n-1]
                else
                    matrix[i][j] = max (matrix[m-1][n],matrix[m][n-1])
                end
            end
        end
    }
```

### Solutions 
DP based solution
```cpp
    int lcseq(string str1, string str2, int m, int n) {
        int matrix[m + 1][n + 1];
    
        for (int i = 0; i < m + 1; i++) {
            for (int j = 0; j < n + 1; j++) {
                // Base Condition
                if (i == 0 || j == 0) {
                    matrix[i][j] = 0;
                    continue;
                }
    
                // Choice Diagram
                if (str1[i - 1] == str2[j - 1])
                    matrix[i][j] = 1 + matrix[i - 1][j - 1];
                else
                    matrix[i][j] = max(matrix[i - 1][j], matrix[i][j - 1]);
            }
        }
    
        cout << "    ";
        for (int j = 0; j < n + 1; j++)
            cout << str2[j] << ' ';
        cout << endl;
        cout << "  ";
        for (int i = 0; i < m + 1; i++) {
            if (i > 0)
                cout << str1[i - 1] << ' ';
            for (int j = 0; j < n + 1; j++) {
                cout << matrix[i][j] << ' ';
            }
            cout << endl;
        }
        return matrix[m][n];
    }
```