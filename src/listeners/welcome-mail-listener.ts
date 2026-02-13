import EventsBus from "../event-bus.js";
import type { UserCreatedPayload } from "../events/events.js";

export function setUpWelcomeEventListener(eventBus: EventsBus) {
  eventBus.on<UserCreatedPayload>({
    eventName: 'UserCreated',
    handler: (event) => {
      console.log(`Sending welcome mail to ${event.email}`);
    },
  });
}
