// Given a string, return the longest substring of distinct characters

// string1 = 'abcdeefghijkllmno'
// output = 'efghijkl'

// abcdeclmnopqrsttc

function updateMap(m, j) {
  var arr = Object.entries(m);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] < j) {
      delete m[arr[i][0]];
    }
  }
}

function getLongestSubDis(s) {
  var maxl = 0;
  var seen = {};
  var currl = 0;
  var start = 0;
  var end = 0;
  var finalstart = 0;
  var finalend = 0;
  for (let i = 0; i < s.length; i++) {
    if (seen[s[i]] && seen[s[i]] >= start) {
      if (currl > maxl) {
        finalstart = start;
        finalend = end;
        maxl = currl;
      }
      // temps = s.substring(seen[s[i]] + 1, i + 1)
      start = seen[s[i]] + 1;
      end = i;
			currl = i - seen[s[i]];
			seen[s[i]] = i;
      // updateMap(seen, seen[s[i]] + 1);
    } else {
      seen[s[i]] = i;
      // temps += s[i];
      end++;
      currl++;
    }
  }
  if (currl > maxl) {
    return s.substring(start, end + 1);
  }
  return s.substring(finalstart, finalend + 1);
}

console.log(getLongestSubDis('abcdeclmnopqrsttc'));

// temps = dec;
// result = abcde;
// maxl = 5;
// currl = 3;
// seen = { a: 0, b: 1, c: 2, d: 3, e: 4 };
