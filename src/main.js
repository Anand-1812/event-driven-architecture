import EventsBus from "./event-bus.js";
import { setAnalyticsListener } from "./listeners/analytics-listener.js";
import { setUpWelcomeEventListener } from "./listeners/welcome-mail-listener.js";
import { UserService } from "./services/user-service.js";
const eventBus = new EventsBus();
const userService = new UserService(eventBus);
// register event listeners
setUpWelcomeEventListener(eventBus);
setAnalyticsListener(eventBus);
userService.registerUser('anand@gmail.com');
//# sourceMappingURL=main.js.map