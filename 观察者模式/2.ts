// 发布订阅模式，只有一个类
interface IEVENT {
  [index: string]: Function;
}
class Event {
  constructor(private internal: IEVENT = {}) {}
  on(eventName: string, callback: Function) {
    this.internal[eventName] = callback;
  }
  trigger(eventName: string) {
    const events = Object.keys(this.internal);
    if (events.indexOf(eventName) !== -1) {
      this.internal[eventName]();
    } else {
      console.log("事件没有注册");
    }
  }
}

const e = new Event();
e.trigger("window");
e.on("window", function () {
  console.log("window function调用");
});
e.trigger("window");

export {};
