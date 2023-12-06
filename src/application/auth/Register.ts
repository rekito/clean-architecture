import {CreateUser} from "../user/CreateUser";
import {UserEmailAlreadyTaken} from "../user/UserEmailAlreadyTaken";
import {User} from "../../domain/user/User";
import {EmailAlreadyInUseException} from "../../domain/user/EmailAlreadyInUseException";

export class Register {
    constructor(
        private readonly createUser: CreateUser,
        private readonly userEmailAlreadyTaken: UserEmailAlreadyTaken,
    ) {}

    public async run(user: User) {
        const isEmailAlreadyInUse = await this.isEmailAlreadyInUse(user.email);

        if (isEmailAlreadyInUse) {
            throw new EmailAlreadyInUseException();
        }

        await this.createUser.run(user);
    }

    private isEmailAlreadyInUse(email: string): Promise<boolean> {
        return this.userEmailAlreadyTaken.run(email);
    }
}