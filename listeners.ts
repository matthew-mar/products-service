import { EventEmitter } from "stream";
import { ProductCreatedData } from "./events/product/created.event";
import { StockLevelCreatedData } from "./events/stock-level/created.event";
import { StockLevelIncreasedData } from "./events/stock-level/increased.event";
import { StockLevelDecreasedData } from "./events/stock-level/decreased.event";
import { Resolver } from "./utils/resolver";

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

listen("product.created", async (data: ProductCreatedData) => {
    await Resolver.cacheService.clear();
    await Resolver.eventPusher.push("product.created", data);
    console.log(`created product with plu ${data.plu}`);
});

listen("stock-level.created", async (data: StockLevelCreatedData) => {
    await Resolver.cacheService.clear();
    await Resolver.eventPusher.push("stock-level.created", data);
    console.log(`created stock-level with id ${data.id}`);
});

listen("stock-level.increased", async (data: StockLevelIncreasedData) => {
    await Resolver.cacheService.clear();
    await Resolver.eventPusher.push("stock-level.increased", data);
    console.log(`increased field ${data.field} of stock-level with id ${data.id}`);
});

listen("stock-level.decreased", async (data: StockLevelDecreasedData) => {
    await Resolver.cacheService.clear();
    await Resolver.eventPusher.push("stock-level.decreased", data);
    console.log(`decreased field ${data.field} of stock-level with id ${data.id}`);
});
