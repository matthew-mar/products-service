import { Producer } from "kafkajs";
import { IEventPusher } from "../contracts/services/event-push.service";

export class KafkaPusher implements IEventPusher {
    constructor(private producer: Producer) {}

    public async push(event: string, eventData: any): Promise<void> {
        await this.producer.connect();
        let sended = await this.producer.send({
            topic: event,
            messages: [{
                key: event,
                value: JSON.stringify({
                    shopId: eventData.shopId ?? null,
                    plu: eventData.plu,
                }),
            }],
        });
        console.info(sended);
    }
}
