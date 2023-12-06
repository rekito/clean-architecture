import {UserRepository} from "../../domain/user/UserRepository";
import {User} from "../../domain/user/User";

export class CreateUser {
    constructor(private readonly userRepository: UserRepository) {}

    public async run(user: User) {
        await this.userRepository.create(user);
    }
}