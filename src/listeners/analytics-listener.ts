import EventsBus from "../event-bus.js";
import type { UserCreatedPayload } from "../events/events.js";

export function setAnalyticsListener(eventBus: EventsBus) {
  eventBus.on<UserCreatedPayload>({
    eventName: 'UserCreated',
    handler: (event) => {
      console.log(`Tracking new user: ${event.userId}`);
    }
  });
}
