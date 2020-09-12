var combinationSum3 = function(k, n) {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const ans = []
    dfs(k, [], arr, ans, n, 0);
    return ans;
};

var dfs = (k, currA, arr, ans, n, i) => {
    // console.log(k, currA, arr, ans, n, i);
    if (currA.length == k) {
        const sum = currA.reduce((s, e) => s + e);
        if (sum == n) {
            ans.push(currA)
        }
        // return ans;
    } else if (currA.length < k) {
        for (let x = i; x < arr.length; x++) {
            dfs(k, [...currA, arr[x]], arr, ans, n, x + 1)
        }
    }
    
}

console.log(combinationSum3(3, 7));
console.log(combinationSum3(3, 9));

