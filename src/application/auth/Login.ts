import {WrongCredentialsException} from "../../domain/user/WrongCredentialsException";
import {VerifyUserPassword} from "../user/VerifyUserPassword";
import {FindUserByEmail} from "../user/FindUserByEmail";

export class Login {
    constructor(
        private readonly verifyUserPassword: VerifyUserPassword,
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