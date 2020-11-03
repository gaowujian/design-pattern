// 行为模式负责对象间的高效沟通和职责委派。

// 观察者模式允许我们定义一种订阅机制，可以在对象改变的时候，通知多个观察该对象的其他对象

// 一些值得关注的状态的对象通常被称为目标，由于它的状态变化通知给其他对象，我们将其称为发布者
// 所有希望关注发布者变化的其他对象被称为订阅者

// 1. 发布者中包含允许新订阅者加入和当前订阅者离开列表的订阅架构。
// 事件发生的时候，会遍历订阅者列表，并传递数据（包括事件信息或者其他data）
interface Publisher {
  subscribe(obj: Subscriber): void;
  unsubscribe(obj: Subscriber): void;
  notify(): void;
}
class ConcretePublisher implements Publisher {
  constructor(
    public name: string,
    private subscribers: Subscriber[] = [],
    private state: string = "初始状态"
  ) {}
  subscribe(obj: Subscriber) {
    const isExist = this.subscribers.includes(obj);
    if (!isExist) {
      this.subscribers.push(obj);
    }
  }
  unsubscribe(obj: Subscriber) {
    const index = this.subscribers.indexOf(obj);
    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }
  notify() {
    this.subscribers.forEach((item) => item.update(this));
  }
  otherLogic() {
    this.state = "新状态";
    this.notify();
  }
  getState() {
    return this.state;
  }
}
// 2. 绝大多数的情况下，订阅者的只有一个update方法，用来接受发布者在事件出发的时候传递过来的信息。
// 为了区分不同的事件出发，发布者一般会把上下文信息传递过来，例如第一个参数是eventType 第二个是 data
interface Subscriber {
  update(publisher: Publisher): void;
}
class ConcreteSubscriber implements Subscriber {
  constructor(public name: string) {}
  update(publisher: ConcretePublisher) {
    console.log(
      `观察者:${this.name} 发现了被观察对象 ${
        publisher.name
      } 状态发生改变: ${publisher.getState()}`
    );
  }
}

const p = new ConcretePublisher("tony");
const k = new ConcreteSubscriber("kevin");
const a = new ConcreteSubscriber("ally");
p.subscribe(k);
p.subscribe(a);
p.notify();

export {};
