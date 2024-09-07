export interface ICacheService {
    save(key: string, value: any): void;

    get(key: string): Promise<any>;

    clear(): Promise<void>;
}
