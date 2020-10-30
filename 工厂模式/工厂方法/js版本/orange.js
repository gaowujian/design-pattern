const Factory = require("./factory");

class Orange {
  constructor(name) {
    this.name = name;
  }
  grow() {
    console.log(`${this.name} is growing`);
  }
}
class OrangeFactory extends Factory {
  static create() {
    return new Orange("苹果");
  }
}

module.exports = OrangeFactory;
