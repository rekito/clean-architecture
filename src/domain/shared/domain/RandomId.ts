import { v4 as uuid } from "uuid";

export class RandomId {
    create(): string {
        return uuid();
    }
}