export interface Connection {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}