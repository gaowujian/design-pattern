// 行为模式负责对象间的高效沟通和职责委派。

// 观察者模式允许我们定义一种订阅机制，可以在对象改变的时候，通知多个观察该对象的其他对象

// 一些值得关注的状态的对象通常被称为目标，由于它的状态变化通知给其他对象，我们将其称为发布者
// 所有希望关注发布者变化的其他对象被称为订阅者

class Publisher {
  constructor(private name: string, private subscribers: Subscriber[] = []) {}
  subscribe(obj: Subscriber) {
    this.subscribers.push(obj);
  }
  send(msg?: string) {
    this.subscribers.forEach((item) => item.getMessage(msg));
  }
}

class Subscriber {
  constructor(private name: string) {}
  getMessage(msg?: string) {
    console.log(`${this.name} 知道修改了 ${msg}`);
  }
}

const p = new Publisher("tony");
const k = new Subscriber("kevin");
const a = new Subscriber("ally");
p.subscribe(k);
p.subscribe(a);
p.send("新闻消息");

export {};
