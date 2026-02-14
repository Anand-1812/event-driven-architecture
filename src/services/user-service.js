import EventsBus from "../event-bus.js";
export class UserService {
    eventBus;
    constructor(eventBus) {
        this.eventBus = eventBus;
    }
    registerUser(email) {
        const userId = `user.${Date.now()}`;
        console.log(`User registered: ${email}`);
        const event = { userId, email };
        this.eventBus.emit('UserCreated', event);
    }
}
//# sourceMappingURL=user-service.js.map