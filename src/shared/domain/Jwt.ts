import { sign } from "jsonwebtoken";
import {injectable} from "inversify";

@injectable()
export class Jwt {
    public sign(payload: any): string {
        return sign(payload, process.env.JWT_SECRET!);
    }
}