import EventsBus from "../event-bus.js";
import type { UserCreatedPayload } from "../events/events.js";

export class UserService {
  constructor(private eventBus: EventsBus) {}

  registerUser(email: string): void {
    const userId = `user.${Date.now()}`;
    console.log(`User registered: ${email}`);


    const event: UserCreatedPayload = {userId, email};
    this.eventBus.emit<UserCreatedPayload>('UserCreated', event);
  }
}
