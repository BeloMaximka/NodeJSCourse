//@ts-check

export default class User {
  #_name;
  #_age;
  constructor(name, age) {
    this.#_name = name;
    this.#_age = age;
  }
  getName() {
    this.#_name;
  }
  getAge() {
    this.#_age;
  }
  toString() {
    return `Name: ${this.#_name} Age: ${this.#_age}`;
  }
}
const PI = 3.14;
// module.exports = { User, PI };
