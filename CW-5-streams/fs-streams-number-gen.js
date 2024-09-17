import path from "node:path";
import fs from "node:fs";

const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname, "files");
const pathToFile = path.join(pathToFolder, "random-numbers.txt");
const writeStream = fs.createWriteStream(pathToFile);

process.on("SIGINT", () => {
  console.log("Stopping...");
  writeStream.destroy();
  process.exit();
});

writeForever(writeStream);

function writeForever(writer) {
  write();
  function write() {
    const randomNumber = Math.round(Math.random() * 1000);
    const ok = writer.write(`${randomNumber}\n`, "utf-8");
    if (!ok) {
      writer.once("drain", write);
      return;
    }
    console.log(`${randomNumber}`);
    setImmediate(write);
  }
}
