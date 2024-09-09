export interface IEventPusher {
    push(event: string, eventData: any): Promise<void>;
}
