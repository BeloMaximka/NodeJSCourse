/*
Common JS modules
ES modules  export-import
*/
// const { User, PI } = require("./User");
import User from "./User.js";
import chalk from "chalk";
const user = new User("Alex", 22);
console.log(chalk.cyan(user.toString()));
// console.log(PI);
