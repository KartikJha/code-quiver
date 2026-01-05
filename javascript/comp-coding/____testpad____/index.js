function x() {
//console.log(x);
    
    //if (true) {
       //let x = 4;
    //}
	//:
    //const apiDataList = [2, 3, 4, 7];
//
    //const apiPromiseList = apiDataList.map(d => fetch(`https://kartikjha.github.io/${d}`));
//
    //console.log(apiPromiseList);
    //
    //const apiResultArr = await Promise.all(apiPromiseList);
//
    //console.log(apiResultArr);
//
    //const a = [1, 3];
//
    //const c = [...a, 5];
//
    //const o = { a: 1, b: 2};
    //
    //const b = { ...o, a: 4, x: 6, p: 8} 
    //console.log(a, c, b);
//
	const res = [ [2, 5, 8], [5, 8, 2], [8, 2, 5] ];
	
	return a.map((e, i) => res.map((e1, i1) => [e].concat(e1)));

}

function perm(arr) {

	if (arr.length == 1) {
		return [arr];
	}

	let result_set = [];

	for( let i = 0; i < arr.length; i++) {
		const [e, carr] = removeICRest(i, arr)
		result_set.push(...perm(carr).map((e1, i1) => [e].concat(e1)))
	}

	return result_set;
}


function removeICRest(i, arr) {
	return [arr[i], [...arr.slice(0, i), ...arr.slice(i + 1)]]
}




const a = [1, 2, 4]

console.log(perm(a));
