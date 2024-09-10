import fs from "node:fs";
const output = fs.readFileSync("log.txt", { encoding: "utf-8" });
const linesCount = output.split(/\r\n|\r|\n/).length;
console.log(`The file has ${linesCount} lines`);