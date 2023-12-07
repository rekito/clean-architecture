import {VerifyUserPassword} from "./VerifyUserPassword";
import {FindUserByEmail} from "./FindUserByEmail";
import {WrongCredentialsException} from "../domain/exception/WrongCredentialsException";
import {inject, injectable} from "inversify";

@injectable()
export class Login {
    constructor(
        @inject('VerifyUserPassword')
        private readonly verifyUserPassword: VerifyUserPassword,
        @inject('FindUserByEmail')
        private readonly findUserByEmail: FindUserByEmail,
    ) {}

    public async run(email: string, password: string): Promise<boolean> {
        const user = await this.findUserByEmail.run(email);
        const isCorrectPassword = await this.verifyUserPassword.run(password, user.password);

        if (!isCorrectPassword) {
            throw new WrongCredentialsException();
        }

        return true;
    }
}