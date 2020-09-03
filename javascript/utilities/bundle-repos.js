const chalk = require("chalk");
const { execSync, exec } = require("child_process");
// const fs = require('fs');

if (!process.argv[2] || !process.argv[3]) {
  console.log(
    chalk.red(
      "Usage: node bundle-repo ORGANIZATION REPO-STRING [BUNDLE-TARGET-DIR]\nExample: node bundle-repo 'twitter' 'main, side, boom'"
    )
  );
  return;
}

const prefix = "git@github.com:";

const finalDir = process.argv[4] ? process.argv[4] + "/" : "";

const getPath = (r) => (!finalDir ? "" : finalDir + r);

process.argv[3].split(",").forEach((r) => {
  execSync(
    `git clone ${prefix}${process.argv[2]}/${r.trim()} ${getPath(r.trim())}`
  );
  const a = execSync(`ls -la ${getPath(r.trim())}`);
  console.log(a.toString());
  if (a.toString().split('\n')[0].split(' ')[1] != 0) {
    execSync(
      `cd ${getPath(
        r.trim()
      )} && git bundle create ${r.trim()}.bundle --all && mv ${r.trim()}.bundle .. && cd .. && rm -rf ${r.trim()}`
    );
  }
});
