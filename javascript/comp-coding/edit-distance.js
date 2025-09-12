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
}

/**
node:internal/modules/cjs/loader:1413
  throw err;
  ^

Error: Cannot find module '/usr/local/lib/vscode-js-debug/out/src/nodeDebug.js'
    at Module._resolveFilename (node:internal/modules/cjs/loader:1410:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1051:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1056:22)
    at Module._load (node:internal/modules/cjs/loader:1219:37)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:238:24)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
    at node:internal/main/run_main_module:33:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}

N
*/
