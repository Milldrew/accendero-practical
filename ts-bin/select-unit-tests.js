"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const CHANGED_FILES_LIST = process.argv.slice(1);
/**
 * Only the changed files with .ts suffix
 */
const changedTypescriptFiles = CHANGED_FILES_LIST.filter((filePath) => /\.ts$/.test(filePath));
console.log(`Changed typescript files: ${changedTypescriptFiles}`);
changedTypescriptFiles.forEach((filePath) => {
    filePath = filePath.replace("src/main/webapp/", "");
    child_process_1.spawnSync(`ng`, ["test", "--include", filePath], {
        stdio: ["inherit", "inherit", "inherit"],
    });
});
//# sourceMappingURL=select-unit-tests.js.map