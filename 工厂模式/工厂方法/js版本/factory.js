class Factory {
  static create() {}
  grow() {
    console.log(`${this.name} is growing`);
  }
}

module.exports = Factory;
