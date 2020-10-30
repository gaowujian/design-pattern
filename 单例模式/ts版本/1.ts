// 单例模式是一种创建型设计模式， 让你能够保证一个类只有一个实例， 并提供一个访问该实例的全局节点。

// 单一模式完成了两项工作，所以为了了单一指责原则
// 1. 保证了类只有一个实例
// 2. 为该实例提供了一个全局访问节点

// 我们允许程序在特性地方访问该对象，但是也应该保护该对象不会被其他代码覆盖

// 实现方式基本有两步骤
// 1. 将默认构造函数设为私有， 防止其他对象使用单例类的 new运算符。
// 2 新建一个静态构建方法作为构造函数。 该函数会 “偷偷” 调用私有构造函数来创建对象，
//  并将其保存在一个静态成员变量中。 此后所有对于该函数的调用都将返回这一缓存对象。

class Singleton {
  private static instance: Singleton;
  private constructor(public name: string) {}
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton("唯一实例");
    }
    return Singleton.instance;
  }
  getName() {
    return this.name;
  }
}

const p1 = Singleton.getInstance();
const p2 = Singleton.getInstance();
console.log(p1 === p2);
console.log(p1.getName());
console.log(p2.getName());
