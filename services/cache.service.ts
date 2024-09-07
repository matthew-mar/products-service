import { Redis } from "ioredis";
import * as crypto from 'crypto';
import { ICacheService } from "../contracts/services/cache.service";

export class CacheService implements ICacheService {
    constructor(private client: Redis) {}
    
    public async clear(): Promise<void> {
        await this.client.flushall();
    }
    
    public save(key: string, value: any): void {
        this.client.set(key, value, "EX", 600);  // TODO: remove ttl hardcode
    }
    
    public async get(key: string): Promise<any> {
        return await this.client.get(key);
    }

    private md5(key: string) {
        return crypto.createHash("md5").update(key).digest("hex");
    }
}
