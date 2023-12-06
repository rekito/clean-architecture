import { sign } from "jsonwebtoken";

export class Jwt {
    public sign(payload: any): string {
        return sign(payload, process.env.JWT_SECRET!);
    }
}