/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
     

    const { p: product, productForZero } = nums.reduce(({p , productForZero}, n) => {
        if (n == 0 && productForZero === undefined) {
            productForZero = p;
            p = 0;
        } else if (n == 0) {
            productForZero = 0;
        } else if (productForZero) {
            productForZero = productForZero * n;
        } else {
            console.log(-1)
            p = n * p;
        }
        // console.log(p, productForZero)
        return {p, productForZero};
    }, { p: 1, productForZero: undefined });

    console.log(product, productForZero);

    return new Array(nums.length).fill(product).map((cP, i) => { 
        let result;
        
        if (nums[i] == 0) {
            result = productForZero;    
        } else {
            result = cP / nums[i];
        }


        if (result == -0) {
            return 0;
        }

        return result;
    });
};

export default productExceptSelf;