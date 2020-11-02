// 对象结构性模式，可以让接口不兼容的对象能够相互合作

// 场景 下载xml数据然后展示数据，如果整合一个第三方库用来展示数据，但是这个库目前只支持json格式数据

// 1. 我们需要修改第三方展示库，让他支持json和xml数据源
// 2. 使用适配器模式，我们要创建适配器类，当客户端代码想使用类库的功能，需要通过适配器类进行交互

// 具体步骤
// 1. 适配器实现与其中一个现有对象兼容的接口
// 2. 现有对象可以使用该接口，适配器中的方法，适配器的中方法再去调用第三方

// 对象适配器

// 复现经典的方钉和圆孔问题

//  1. 确保至少有两个类的接口不兼容：
// 方钉的接口是获取一边长度getWidth, 而圆孔的接口是获取半径 getRadius, 满足条件。

// 在这个问题当中，有两个接口相互兼容的类：圆孔（Round­Hole）和圆钉（Round­Peg）,
// 还有一个不兼容的类：方钉（Square­Peg）。适配器类让你能够将方钉放入圆孔中。它会对 RoundPeg 类进行扩展，
// 以接收适配器对象作为圆钉

// 服务类就是我们的圆孔类和圆钉类，即遗留代码或者第三方代码，他们提供了一个fit服务。
// 客户端类就是的方钉类，之后可能会有更多的菱型钉类...，即未来可能会出现的类，需要使用之前的服务 。
namespace step1 {
  //服务端类：圆钉类
  class RoundPeg {
    constructor(private radius?: number) {}
    getRadius(): number {
      return this.radius;
    }
  }
  //服务端类：圆孔类
  class RoundHole {
    constructor(private radius: number) {}
    getRadius() {
      return this.radius;
    }
    fits(peg: RoundPeg): boolean {
      return this.getRadius() >= peg.getRadius();
    }
  }
  // 客户端类：方钉类
  class SquarePeg {
    constructor(private width: number) {}
    getWidth(): number {
      return this.width;
    }
  }
}

// 2. 声明客户端接口， 描述客户端如何与服务交互。

namespace step2 {
  class RoundPeg {
    constructor(private radius?: number) {}
    getRadius(): number {
      return this.radius;
    }
  }
  //服务端类：圆孔类
  class RoundHole {
    constructor(private radius: number) {}
    getRadius() {
      return this.radius;
    }
    fits(peg: RoundPeg): boolean {
      return this.getRadius() >= peg.getRadius();
    }
  }
  //服务描述，如何使用该服务
  const roundPeg = new RoundPeg(5);
  const roundHole = new RoundHole(10);
  roundHole.fits(roundPeg);
}
//我们的目标
// class Adpater {
//   constructor() {}
// }

// const SquarePeg = new RoundPeg(5);
// const roundHole = new RoundHole(10);
// const adaptedPeg = new Adpater(SquarePeg)

//服务的使用方式不变，传入我们自己的数据
// roundHole.fits(adaptedPeg)

// 3. 创建遵循客户端接口的适配器类。 所有方法暂时都为空。

namespace step3 {
  class RoundPeg {
    constructor(private radius?: number) {}
    getRadius(): number {
      return this.radius;
    }
  }
  class PegAdapter extends RoundPeg {}
}
// 4. 在适配器类中添加一个成员变量用于保存对于服务对象的引用。
// 通常情况下会通过构造函数对该成员变量进行初始化但有时在调用其方法时将该变量传递给适配器会更方便。
// 服务类和服务对象不是一个，服务对象值得是适配器类需要服务的对象，即我们的新代码或者未来要写的代码。

namespace step4 {
  class RoundPeg {
    constructor(private radius?: number) {}
  }
  class SquarePeg {
    constructor(private width: number) {}
    getWidth(): number {
      return this.width;
    }
  }
  class PegAdapter extends RoundPeg {
    // peg指向的是服务对象，SquarePeg
    constructor(private peg: SquarePeg) {
      super();
    }
    setPeg(peg: SquarePeg) {
      this.peg = peg;
    }
  }
}

// step5: 依次实现适配器类客户端接口的所有方法。 适配器会将实际工作委派给服务对象，
// 自身只负责接口或数据格式的转换。
namespace step5 {
  class RoundPeg {
    constructor(private radius?: number) {}
    getRadius(): number {
      return this.radius;
    }
  }
  class SquarePeg {
    constructor(private width: number) {}
    getWidth(): number {
      return this.width;
    }
  }
  class RoundHole {
    constructor(private radius: number) {}
    getRadius() {
      return this.radius;
    }
    fits(peg: RoundPeg): boolean {
      return this.getRadius() >= peg.getRadius();
    }
  }
  class PegAdapter extends RoundPeg {
    // 方钉引用
    constructor(private peg: SquarePeg) {
      super();
    }
    // 接口和数据格式的转换
    getRadius() {
      return (this.peg.getWidth() * Math.sqrt(2)) / 2;
    }
  }

  // 目的就是让一个方形对象 进过转换生成一个新的对象 然后再被传入所需的位置去
  const squarePeg = new SquarePeg(5);
  const adaptedPeg = new PegAdapter(squarePeg);

  const roundHole = new RoundHole(10);
  console.log(roundHole.fits(adaptedPeg));
}
