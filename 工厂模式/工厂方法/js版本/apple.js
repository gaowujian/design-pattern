const Factory = require("./factory");
class Apple {
  constructor(name) {
    this.name = name;
  }
  grow() {
    console.log(`${this.name} is growing`);
  }
}
class AppleFactory extends Factory {
  static create() {
    return new Apple("苹果");
  }
}

module.exports = AppleFactory;
