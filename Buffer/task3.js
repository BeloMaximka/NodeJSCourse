const buffer = Buffer.from(process.argv[2] ?? '');
const string = buffer.toString();
console.log(string);