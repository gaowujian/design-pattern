// 组合模式是一种结构型设计模式， 你可以使用它将对象组合成树状结构， 并且能像使用独立对象一样使用它们

// 结构型设计模式
// 使用场景：
// 1. 有简单的对象，需要实现树状的对象结构，可以使用组合模式
// 提供两个共享公共接口的基本类型，一个是基本元素对象，一个是盒子对象，盒子对象可能包含多个基本元素对象和
// 其他盒子对象

// 2. 希望可以端以同样的方式去处理简单元素和复杂元素，可以使用该模式

// 实现步骤
// 1.确保应用的核心模型能够以树状结构表示。 尝试将其分解为简单元素和容器。
// 记住， 容器必须能够同时包含简单元素和其他容器。

// 我们要实现一个盒子和订单的需求，订单可以直接进行计算，盒子需要去递归调用内部的多个订单返回总价，满足条件

// 2.声明组件接口，和一系列方法，这些方法对简单和复杂的元素都有意义

// 盒子和订单类，都有一个compute方法，实现不同
interface Component {
  compute(): string;
}

// 3.创建一个叶节点类表示简单元素。 程序中可以有多个不同的叶节点类。

class Order implements Component {
  constructor(private name: string, private price: number) {}
  compute() {
    return `${this.name}: ${this.price} `;
  }
}

// 4.创建一个容器类表示复杂元素。 在该类中， 创建一个数组成员变量来存储对于其子元素的引用。
//  该数组必须能够同时保存叶节点和容器， 因此请确保将其声明为组合接口类型。
// 实现组件接口方法时， 记住容器应该将大部分工作交给其子元素来完成。

namespace step4 {
  interface Component {
    compute(): string;
  }
  class Box implements Component {
    constructor(private name: string, arr: Component[]) {}
    compute() {
      return "string";
    }
  }
}

// 5.最后， 在容器中定义添加和删除子元素的方法。记住， 这些操作可在组件接口中声明。
// 这将会违反_接口隔离原则_， 因为叶节点类中的这些方法为空。
// add,remove 这些接口可以放在 Component接口中，但是Order类实例是没有对这些接口的实现的，
// 所以违背了接口隔离的原则, 也可以直接放在类中，没必要放在公共接口中

// 实现组件接口方法时， 记住容器应该将大部分工作交给其子元素来完成。
class Box implements Component {
  constructor(private name: string, private arr: Component[] = []) {}
  compute() {
    let sum = "";
    for (const item of this.arr) {
      sum += item.compute();
    }
    return sum;
  }
  add(obj: Component) {
    this.arr.push(obj);
  }
  remove(obj: Component) {
    const index = this.arr.indexOf(obj);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  }
}

// 客户端代码
function clientCode(item: Component) {
  console.log(item.compute());
}
// 简单对象
const simple = new Order("1", 10);
clientCode(simple);

// 复杂对象
const o1 = new Order("o1", 20);
const o2 = new Order("o2", 20);
const b1 = new Box("b1");
b1.add(o1);
b1.add(o2);
const o3 = new Order("o3", 100);
const b2 = new Box("b2");
b2.add(o3);
const o4 = new Order("o4", 35);
const b3 = new Box("b3");
b3.add(b1);
b3.add(b2);
b3.add(o4);
// 和简单对象的调用方式一样
clientCode(b3);
