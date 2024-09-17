import path from "node:path";
import fs from "node:fs/promises";

const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname, "files");

await createFileInDirectoryWithText(
  pathToFolder,
  "data.txt",
  "NODEJS Programm"
);

const pathToFile = path.join(pathToFolder, "data.txt");
await printTextFromFile(pathToFile);

async function createFileInDirectoryWithText(pathToDirectory, filename, text) {
  try {
    await fs.mkdir(pathToDirectory, { recursive: true });

    const pathToFile = path.join(pathToDirectory, filename);
    await fs.writeFile(pathToFile, text);
  } catch (error) {
    console.log(`Error while writing to file: ${error}`);
  }
}

async function printTextFromFile(pathToFile) {
  const buffer = await fs.readFile(pathToFile, { encoding: "utf8" });
  console.log(buffer);
}
