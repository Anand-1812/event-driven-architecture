type EventHandler<T> = (payload: T) => void;

export class EventsBus {
  private listeners: Map<string, EventHandler<any>[]> = new Map();

  emit<T>(eventName: string, payload: T): void {
    const handlers = this.listeners.get(eventName) || [];

    for (const handler of handlers) {
      handler(payload);
    }
  }

  on<T>({
    eventName,
    handler,
  }: {
    eventName: string;
    handler: EventHandler<T>;
  }): void {
    const handlers = this.listeners.get(eventName) || [];

    handlers.push(handler);
    this.listeners.set(eventName, handlers);
  }
}

