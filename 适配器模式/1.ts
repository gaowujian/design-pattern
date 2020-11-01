// 对象结构性模式，可以让接口不兼容的对象能够相互合作

// 场景 下载xml数据然后展示数据，如果整合一个第三方展示数据库，但是只支持json数据

// 1. 我们需要修改第三方展示库，让他支持json和xml数据源
// 2. 使用适配器模式，我们要创建适配器类，当客户端代码想使用类库的功能，需要通过适配器类进行交互

// 具体步骤
// 1. 适配器实现与其中一个现有对象兼容的接口
// 2. 现有对象可以使用该接口，适配器中的方法，适配器的中方法再去调用第三方

// 对象适配器

// 复现经典的方钉和圆孔问题

// 圆钉类接口
class RoundPeg {
  constructor(private radius?: number) {}
  getRadius(): number {
    return this.radius;
  }
}

// 圆孔类
class RoundHole {
  constructor(private radius: number) {}
  getRadius() {
    return this.radius;
  }
  fits(peg: RoundPeg): boolean {
    return this.getRadius() >= peg.getRadius();
  }
}

// 方钉类
class SquarePeg {
  constructor(private width: number) {}
  getWidth(): number {
    return this.width;
  }
}

// 要继承才能传入fits方法，因为fits方法需要的类型是RoundPeg类型，或其他相同类型对象
// 封装了width转radius的逻辑，并继承要适配对象的方法
class PegAdapter extends RoundPeg {
  // 方钉引用
  constructor(private peg: SquarePeg) {
    super();
  }
  getRadius() {
    return (this.peg.getWidth() * Math.sqrt(2)) / 2;
  }
}

// 目的就是让一个方形对象 进过转换生成一个新的对象 然后再被传入所需的位置去
const squarePeg = new SquarePeg(5);
const adaptedPeg = new PegAdapter(squarePeg);

const roundHole = new RoundHole(10);
console.log(roundHole.fits(adaptedPeg));
