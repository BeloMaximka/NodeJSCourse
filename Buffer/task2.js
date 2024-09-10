import { randomBytes } from 'node:crypto';
const buffer = Buffer.from(randomBytes(16));
console.log(buffer);