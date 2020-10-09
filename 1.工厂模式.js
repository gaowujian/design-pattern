// 简单工厂
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

const fruit1 = Factory.create("orange");
fruit1.grow();

// ===================================

// 简单工厂模式是不符合开闭原则的，在如果需要创建新类型的时候，需要修改源码

// 工厂方法模式
console.log("11");
