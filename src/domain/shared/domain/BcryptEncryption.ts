import {compare, genSalt, hash } from "bcryptjs";
import {EncryptPassword} from "./EncryptPassword";

export class BcryptEncryption implements EncryptPassword {
    private readonly ROUNDS = 10;

    async encrypt(text: string): Promise<string> {
        const salt = await genSalt(this.ROUNDS);
        return hash(text, salt);
    }

    compare(text: string, hash: string): Promise<boolean> {
        return compare(text, hash);
    }
}