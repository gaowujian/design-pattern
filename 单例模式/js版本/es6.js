class Window {
  constructor(name) {
    this.name = name;
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new Window("window obj");
    }
    return this._instance;
  }
}

const w1 = Window.getInstance();
const w2 = Window.getInstance();
console.log(w1 === w2);
