type EventHandler<T> = (payload: T) => void;
export default class EventsBus {
    private listeners;
    emit<T>(eventName: string, payload: T): void;
    on<T>({ eventName, handler, }: {
        eventName: string;
        handler: EventHandler<T>;
    }): void;
}
export {};
//# sourceMappingURL=event-bus.d.ts.map