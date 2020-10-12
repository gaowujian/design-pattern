class Apple {
  constructor(name) {
    this.name = name;
  }
  grow() {
    console.log(`${this.name} is growing`);
  }
}
class Orange {
  constructor(name) {
    this.name = name;
  }
  grow() {
    console.log(`${this.name} is growing`);
  }
}

class Factory {
  static create(type) {
    switch (type) {
      case "apple":
        return new Apple("苹果");
      case "orange":
        return new Orange("橘子");
      default:
        return new Apple("苹果");
    }
  }
}

// ========================
// 客户端代码
const orange = Factory.create("orange");
orange.grow();
