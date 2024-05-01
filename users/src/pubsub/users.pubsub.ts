class PubSub {
  private subscribers: Record<string, ((data: any) => void)[]> = {};

  subscribe(event: string, callback: (data: any) => void): void {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  publish(event: string, data: any): void {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event].forEach((callback) => callback(data));
  }
}

export default PubSub;
