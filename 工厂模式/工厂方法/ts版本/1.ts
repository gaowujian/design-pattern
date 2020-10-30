// 工厂方法模式是一种创建型的设计模式，可以在父类中提供一个创建对象的方法，允许子类决定初始化对象的类型。

// 工厂方法模式是使用了特殊的工厂方法替代了对于对象构造函数的直接调用（即使用new操作符），对象仍然需要new去创建
// 但是该操作符会在工厂方法中去调用，而不需要使用者主动调用。工厂方法返回的对象就是产品，也就是我们平时需要new创建
// 的实例对象

// 1. 首先产品要有共同的基类或者接口，子类才可以返回不同的产品，
// 同时工厂基类的工厂方法需要返回产品的基类或者产品共同接口作为返回类型

interface Transport {
  deliver(): void;
}
class Truck implements Transport {
  public deliver() {
    console.log("truck 运输");
  }
}

class Ship implements Transport {
  public deliver() {
    console.log("ship 运输");
  }
}

// 工厂基类
interface Logistics {
  // 工厂方法，返回产品的基类作为返回值
  createTransport(): Transport;
}

// 工厂子类
class RoadLogistics implements Logistics {
  createTransport() {
    return new Truck();
  }
}
class SeaLogistics implements Logistics {
  createTransport() {
    return new Ship();
  }
}

const truck = new RoadLogistics().createTransport();
truck.deliver();
const ship = new SeaLogistics().createTransport();
ship.deliver();
export {};
