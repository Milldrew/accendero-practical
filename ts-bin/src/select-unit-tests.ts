import { spawn, spawnSync } from "child_process";
const CHANGED_FILES_LIST = process.argv.slice(1);

/**
 * Only the changed files with .ts suffix
 */
const changedTypescriptFiles = CHANGED_FILES_LIST.filter((filePath) =>
  /\.ts$/.test(filePath)
);
console.log(`Changed typescript files: ${changedTypescriptFiles}`);

changedTypescriptFiles.forEach((filePath) => {
  filePath = filePath.replace("src/main/webapp/", "");
  spawnSync(`ng`, ["test", "--include", filePath], {
    stdio: ["inherit", "inherit", "inherit"],
  });
});
