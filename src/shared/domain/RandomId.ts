import { v4 as uuid } from "uuid";
import {injectable} from "inversify";

@injectable()
export class RandomId {
    create(): string {
        return uuid();
    }
}