import {BcryptEncryption} from "../../domain/shared/domain/BcryptEncryption";

export class VerifyUserPassword {
    constructor(private readonly bcryptEncryption: BcryptEncryption) {
    }

    public async run(password: string, hash: string): Promise<boolean> {
        return this.bcryptEncryption.compare(password, hash);
    }
}