function test(a, k) {
  var seen = [];
  for (let i = 0; i < a.length; i++) {
    seen[i] = {};
  }
  k -= a[0];
  if (k < 1) {
    return false;
  }
  seen[0][k] = true;
  return recur(a, k, a[0], seen);
}

function recur(a, k, i, seen) {
  console.log(k, i, seen);
  var red = k - a[i];
  if (k < 0 || red < 0) {
    return false;
  }
  if (i + a[i] == a.length - 1) {
    return true;
  }
  var l = i - a[i];
  var r = i + a[i];
  if (l > -1 && r < a.length && !seen[l][red] && !seen[r][red]) {
    seen[l][red] = true;
    seen[r][red] = true;
    return recur(a, red, l, seen) || recur(a, red, r, seen);
  } else if (l > -1 && !seen[l][red]) {
    seen[l][red] = true;
    return recur(a, red, l, seen);
  } else if (r < a.length && !seen[r][red]) {
    seen[r][red] = true;
    return recur(a, red, r, seen);
  } else return false;
}

// function test2(a, k) {
// 	tabulation = [];
// 	for (let i = 0; i < a.length; i++) {

// 	}
// }

// expected false
console.log(test([1, 2, 3, 1, 3, 2, 1, 2], 5));
// expected true
console.log(test([1, 2, 3, 1, 1, 2], 5));
