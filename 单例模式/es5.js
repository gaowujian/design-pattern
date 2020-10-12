function Window(name) {
  this.name = name;
}
Window.getInstance = (function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new Window();
    }
    return instance;
  };
})();

const w1 = Window.getInstance();
const w2 = Window.getInstance();
console.log(w1 === w2);
