// 抽象工厂模式也是一种创建设计模式，能够创建一系列相关的对象，而无需指定具体类。

// 原来一个工厂类中只有一个工厂方法，一个工厂方法只能返回一个产品，
// 但是现在我们需要一个工厂可以制造多个产品，就需要多个工厂方法

class Table {
  constructor(public name: string) {}
  getName() {
    return this.name;
  }
}
class Chair {
  constructor(public name: string) {}
  getName() {
    return this.name;
  }
}

interface abstractFactory {
  createTable(): Table;
  createChair(): Chair;
}

class ModernFactory implements abstractFactory {
  createTable() {
    return new Table("现代桌子");
  }
  createChair() {
    return new Chair("现代椅子");
  }
}
class TraditionalFactory implements abstractFactory {
  createTable() {
    return new Table("传统桌子");
  }
  createChair() {
    return new Chair("传统椅子");
  }
}
const table1 = new ModernFactory().createTable();
console.log(table1.getName());

const chair1 = new TraditionalFactory().createChair();
console.log(chair1.getName());
