import {CreateUser} from "../../user/application/CreateUser";
import {UserEmailAlreadyTaken} from "../../user/application/UserEmailAlreadyTaken";
import {User} from "../../user/domain/User";
import {EmailAlreadyInUseException} from "../../user/domain/exception/EmailAlreadyInUseException";

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