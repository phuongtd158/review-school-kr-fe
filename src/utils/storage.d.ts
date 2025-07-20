export declare class Storage {
    private prefix;
    constructor(prefix?: string);
    private getKey;
    set<T>(key: string, value: T): boolean;
    get<T>(key: string, defaultValue?: T | null): T | null;
    remove(key: string): boolean;
    has(key: string): boolean;
    clear(): boolean;
}
export declare const storage: Storage;
