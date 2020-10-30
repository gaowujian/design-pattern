function Window(name) {
  this.name = name;
}
Window.prototype.getName = function () {
  console.log(this.name);
};

function createSingle(Constructor) {
  let instance;
  const SingleConstructor = function (...args) {
    if (!instance) {
      //   Constructor.apply(this, args);
      //   instance = this;
      instance = new Constructor(...args);
    }
    return instance;
  };
  //   SingleConstructor.prototype = Object.create(Constructor.prototype);
  return SingleConstructor;
}

const createWindow = createSingle(Window);
const w1 = new createWindow("window1");
const w2 = new createWindow("window2");
w1.getName();
w2.getName();
console.log(w1 === w2);
