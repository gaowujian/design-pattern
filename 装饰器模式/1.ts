// 结构型模式介绍如何将对象和类组装成较大的结构， 并同时保持结构的灵活和高效。
// 结构型模式描述如何将类或对象按某种布局组成更大的结构。它分为类结构型模式和对象结构型模式，
// 前者采用继承机制来组织接口和类，后者釆用组合或聚合来组合对象。

// 装饰器模式属于对象结构型模式，允许将对象放入包含行为的特殊分装对象中来为原对象绑定新的行为

// 当我们需要对一个对象的行为进行修改的时候，我们想到的第一点是拓展类。拓展类是静态的，如果你希望在无需修改
// 代码的情况下即可使用对象， 且希望在运行时为对象新增额外的行为， 可以使用装饰模式。

// 实现思想：抛弃继承，使用聚合/组合的方式来实现效果，即装饰器模式

// 装饰模式是一种结构型设计模式， 允许你通过将对象放入包含行为的特殊封装对象中来为原对象绑定新的行为。

// 实现步骤：

// 1. 确保业务逻辑可用一个基本组件及多个额外可选层次表示。

// 2. 找出基本组件和可选层次的通用方法。 创建一个组件接口并在其中声明这些方法。

namespace step2 {
  interface Component {
    operation(): void;
  }
}

// 3. 创建一个具体组件类， 并定义其基础行为。
namespace step3 {
  interface Component {
    operation(): void;
  }
  class BaseComponent implements Component {
    constructor(private name: string) {}
    operation() {
      console.log(`${this.name} is doing basic operation`);
    }
  }
}

// 4. 创建装饰基类， 使用一个成员变量存储指向被封装对象的引用。
// 该成员变量必须被声明为组件接口类型， 从而能在运行时连接具体组件和装饰。
// 装饰基类必须将所有工作委派给被封装的对象。

namespace step4 {
  interface Component {
    operation(): void;
  }
  class BaseComponent implements Component {
    constructor(private name: string) {}
    operation() {
      console.log(`${this.name} is doing basic operation`);
    }
  }
  class Decorator {
    constructor(private wrappedComp: BaseComponent) {}
  }
}

// 5. 确保所有类实现组件接口。
namespace step5 {
  interface Component {
    operation(): void;
  }
  class BaseComponent implements Component {
    constructor(private name: string) {}
    operation() {
      console.log(`${this.name} is doing basic operation`);
    }
  }
  class Decorator {
    constructor(private wrappedComp: BaseComponent) {}
    operation() {
      this.wrappedComp.operation();
    }
  }
}

// 6. 将装饰基类扩展为具体装饰。 具体装饰必须在调用父类方法 （总是委派给被封装对象） 之前或之后执行自身的行为。
// 在实际使用的时候，也可能不必抽象出基础装饰类和具体装饰类，直接在基础装饰类上就可以进行修改。
namespace step6 {
  interface Component {
    operation(): void;
  }
  class BaseComponent implements Component {
    constructor(public name: string) {}
    operation() {
      console.log(`${this.name} is doing basic operation`);
    }
  }
  class Decorator {
    constructor(public name: string, protected wrappedComp: BaseComponent) {}
    operation() {
      console.log(`${this.name} running base decorator operation`);
      this.wrappedComp.operation();
    }
  }
  class ConcreteDecorator extends Decorator {
    operation() {
      console.log(`${this.name} running concrete decorator operation`);
      super.operation();
    }
  }

  // 客户端代码负责创建装饰并将其组合成客户端所需的形式。
  function clientCode(arg: Component) {
    arg.operation();
  }

  // 基础组件执行operation
  let simple = new BaseComponent("basic compo");
  clientCode(simple);
  console.log("=============================");

  simple = new Decorator("decorated compo", simple);
  clientCode(simple);
  console.log("=============================");

  simple = new ConcreteDecorator("concrete decorated compo", simple);
  clientCode(simple);
}

export {};
