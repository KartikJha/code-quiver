import {
  differentCharInEqualLenStrings,
  overlapStringsAndGetDiff
} from './lib';

export default (s1, s2) => {
  if (!s1.length) {
    return s2.length;
  }
  if (!s2.length) {
    return s1.length;
  }
  const lenDiff = Math.abs(s1.length - s2.length);
  // only subs
  if (s1.length === s2.length) {
    return differentCharInEqualLenStrings(s1, s2);
  } else if (s1.length < s2.length) {
    // subs + addition
    return overlapStringsAndGetDiff(s1, s2, lenDiff);
  } else {
    // subs + deletion
    return overlapStringsAndGetDiff(s2, s1, lenDiff);
  }
};
