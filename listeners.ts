import { EventEmitter } from "stream";
import { ProductCreatedData } from "./events/product/created.event";

const eventEmitter = new EventEmitter();

export type Event = (
    "product.created"
)

export function emitEvent(eventName: Event, ...args: any) {
    eventEmitter.emit(eventName, ...args);
}

const listen = (eventName: Event, callback: (...args: any[]) => void) => {
    eventEmitter.on(eventName, callback);
};

listen("product.created", (data: ProductCreatedData) => {
    console.log(`created product with plu ${data.plu}`);
})
