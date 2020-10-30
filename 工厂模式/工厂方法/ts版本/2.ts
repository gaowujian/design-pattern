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

// 使用抽象类代替接口，增加耦合性，可以在基类的方法中获取创建的对象进行其他操作
abstract class Logistics {
  abstract createTransport(): Transport;
  otherMethod() {
    const product = this.createTransport();
    console.log("===================");
    product.deliver();
  }
}

// 工厂子类
class RoadLogistics extends Logistics {
  createTransport() {
    return new Truck();
  }
}
class SeaLogistics extends Logistics {
  createTransport() {
    return new Ship();
  }
}

// 根据工厂类的工厂方法去创建对象，使用者接触不到产品的new操作
const truck = new RoadLogistics().createTransport();
truck.deliver();

const road = new RoadLogistics();
road.otherMethod();
export {};
