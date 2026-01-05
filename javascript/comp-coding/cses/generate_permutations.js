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

console.log(perm([1, 2, 4]));

