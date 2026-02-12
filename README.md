# Event Driven Architecture

__Some Concepts__

1. In an event driven architecture
 - Producers: Generates events and publish them to an event stream
 - Consumers: Subscribe to and handle the events they are interested interested
 - Broker: Middleware handelling the traffic (RabbitMQ, Kafka)
 - Event: Message caputuring specific action (e.g. UserCreated, PaymentProcessed)
 - Event Bus: The comunication layer that delivers events from producers to consumer

2. Advantages:
 - Losse Coupling (Modularity): Isolation of components
 - Scalability: asychronous events processing, workload can be distributed
 - Extensibiliy: Adding feature is simple
 - Resilience: Components can fail or restart independently
