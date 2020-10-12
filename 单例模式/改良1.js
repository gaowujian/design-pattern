let Window = (function () {
  let lastWindow;
  let Window = function (name) {
    if (lastWindow) return lastWindow;
    else {
      this.name = name;
      lastWindow = this;
      return lastWindow;
    }
  };
  return Window;
})();

const w1 = new Window();
const w2 = new Window();
console.log(w1 === w2);
