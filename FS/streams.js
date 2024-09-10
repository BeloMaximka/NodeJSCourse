import path from "node:path";
import fs from "node:fs";

const __dirname = import.meta.dirname;

const readStream = fs.createReadStream(path.resolve(__dirname, "task1.js"), {
    highWaterMark: 10,
});

readStream.on("data", (chunk) => {
    console.log('================');
    console.log(`chunk length: ${chunk.length}`);
    console.log(chunk);
    console.log('================');
})
readStream.on("end", () => {
    console.log("FIN");
})