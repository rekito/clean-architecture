import {BcryptEncryption} from "../../shared/domain/BcryptEncryption";
import {inject, injectable} from "inversify";

@injectable()
export class VerifyUserPassword {
    constructor(@inject('BcryptEncryption') private readonly bcryptEncryption: BcryptEncryption) {
    }

    public async run(password: string, hash: string): Promise<boolean> {
        return this.bcryptEncryption.compare(password, hash);
    }
}