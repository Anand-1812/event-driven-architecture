import EventsBus from "../event-bus.js";
export function setUpWelcomeEventListener(eventBus) {
    eventBus.on({
        eventName: 'UserCreated',
        handler: (event) => {
            console.log(`Sending welcome mail to ${event.email}`);
        },
    });
}
//# sourceMappingURL=welcome-mail-listener.js.map