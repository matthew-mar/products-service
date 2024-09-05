import { EventEmitter } from "stream";
import { ProductCreatedData } from "./events/product/created.event";
import { StockLevelCreatedData } from "./events/stock-level/created.event";
import { StockLevelIncreasedData } from "./events/stock-level/increased.event";
import { StockLevelDecreasedData } from "./events/stock-level/decreased.event";

const eventEmitter = new EventEmitter();

export type Event = (
    "product.created" |
    "stock-level.created" |
    "stock-level.increased" |
    "stock-level.decreased"
);

export function emitEvent(eventName: Event, ...args: any) {
    eventEmitter.emit(eventName, ...args);
}

const listen = (eventName: Event, callback: (...args: any[]) => void) => {
    eventEmitter.on(eventName, callback);
};

listen("product.created", (data: ProductCreatedData) => {
    console.log(`created product with plu ${data.plu}`);
});

listen("stock-level.created", (data: StockLevelCreatedData) => {
    console.log(`created stock-level with id ${data.id}`);
});

listen("stock-level.increased", (data: StockLevelIncreasedData) => {
    console.log(`increased field ${data.field} of stock-level with id ${data.id}`);
});

listen("stock-level.decreased", (data: StockLevelDecreasedData) => {
    console.log(`decreased field ${data.field} of stock-level with id ${data.id}`);
});
