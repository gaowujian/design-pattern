interface Event {
  on(eventName: string, callback: Function): void;
  trigger(eventName: string, data: string): void;
}

interface CachedData {
  [index: string]: any;
}
class ConcreteEvent implements Event {
  constructor(public obj: CachedData = {}) {}
  /**
   * on 订阅事件，传递函数作为callback，在事件触发之后被调用
   */
  public on(eventName: string, callback: Function) {
    const isExist = Object.keys(this.obj).includes(eventName);
    if (!isExist) this.obj[eventName] = [];
    this.obj[eventName].push(callback);
  }
  /**
   * trigger, 触发事件，并传递数据
   */
  public trigger(eventName: string, data: string) {
    const isArr = Array.isArray(this.obj[eventName]);
    if (isArr) {
      for (const callback of this.obj[eventName]) {
        callback(eventName, data);
      }
    }
  }
}

class Person {
  constructor(private name: string, private e: Event) {}
  setEventCenter(e: Event) {
    this.e = e;
  }
  callback(eventName: string, data: string) {
    console.log(`订阅者${this.name}注册的${eventName}事件收到消息:${data}`);
  }
  publish(eventName: string, data: string) {
    this.e.trigger(eventName, data);
  }
}
// 创建一个事件中心, 事件中心始终是职责和动作的执行者
// 订阅者通知事件中心，在xx事件触发的时候，调用我传入的callback
// 发布者通知事件中心，我想要触发xx事件，同时我要传入一些数据
const e = new ConcreteEvent();

// 没有包装
// e.on("click", function (eventName: string, data: string) {
//   console.log(`p1 触发${eventName}事件,传入数据:${data}`);
// });
// e.on("click", function (eventName: string, data: string) {
//   console.log(`p2 触发${eventName}事件,传入数据:${data}`);
// });
// e.on("input", function (eventName: string, data: string) {
//   console.log(`p1 触发${eventName}事件,传入数据:${data}`);
// });
// e.trigger("click", "msg");
// e.trigger("input", "666");

// 封装后
const p1 = new Person("p1", e);
const p2 = new Person("p2", e);
const p3 = new Person("p3", e);
e.on("click", p1.callback.bind(p1));
e.on("click", p2.callback.bind(p2));
e.on("input", p1.callback.bind(p1));
p3.publish("click", "单击");
p1.publish("input", "输入了username");

export {};
