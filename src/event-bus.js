export default class EventsBus {
    listeners = new Map();
    emit(eventName, payload) {
        const handlers = this.listeners.get(eventName) || [];
        for (const handler of handlers) {
            handler(payload);
        }
    }
    on({ eventName, handler, }) {
        const handlers = this.listeners.get(eventName) || [];
        handlers.push(handler);
        this.listeners.set(eventName, handlers);
    }
}
//# sourceMappingURL=event-bus.js.map