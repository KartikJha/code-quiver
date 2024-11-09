async function x() {
    console.log(x);
    
    if (true) {
       let x = 4;
    }


    const apiDataList = [2, 3, 4, 7];

    const apiPromiseList = apiDataList.map(d => fetch(`https://kartikjha.github.io/${d}`));

    console.log(apiPromiseList);
    
    const apiResultArr = await Promise.all(apiPromiseList);

    console.log(apiResultArr);

    const a = [1, 3];

    const c = [...a, 5];

    const o = { a: 1, b: 2};
    
    const b = { ...o, a: 4, x: 6, p: 8} 
    console.log(a, c, b);

}

const a = [1, 2, 4]

x();