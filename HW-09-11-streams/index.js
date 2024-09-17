import path from "node:path";
import fs from "node:fs";
import stream from "node:stream";

const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname, "files");
const pathToFile = path.join(pathToFolder, "lorem.txt");

const readStream = fs.createReadStream(pathToFile, { encoding: "utf8" });
const transformtoUpperCaseStream = new stream.Transform({
  transform(chunk, _, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});
const transformOTo0Stream = new stream.Transform({
  transform(chunk, _, callback) {
    callback(null, chunk.toString().replace(/[oO]/g, "0"));
  },
});
stream.pipeline(
  readStream,
  transformtoUpperCaseStream,
  transformOTo0Stream,
  handleError
);

printTextFromStreamWithDelay(transformOTo0Stream, 100);

function printTextFromStreamWithDelay(stream, delay) {
  let end = false;
  stream.on("end", () => (end = true));

  stream.once("readable", readOneCharacter);
  function readOneCharacter() {
    const chunk = stream.read(1);
    if (chunk) {
      process.stdout.write(chunk, handleError);
    }
    if (!end) {
      setTimeout(() => stream.once("readable", readOneCharacter), delay);
    }
  }
}

function handleError(err) {
  if (err) {
    console.log(err);
  }
}
