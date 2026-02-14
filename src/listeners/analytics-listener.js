import EventsBus from "../event-bus.js";
export function setAnalyticsListener(eventBus) {
    eventBus.on({
        eventName: 'UserCreated',
        handler: (event) => {
            console.log(`Tracking new user: ${event.userId}`);
        }
    });
}
//# sourceMappingURL=analytics-listener.js.map