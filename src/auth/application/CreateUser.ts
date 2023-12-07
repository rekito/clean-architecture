import {UserRepository} from "../domain/UserRepository";
import {User} from "../domain/User";
import {inject, injectable} from "inversify";

@injectable()
export class CreateUser {
    constructor(@inject('UserRepository') private readonly userRepository: UserRepository) {}

    public async run(user: User) {
        await this.userRepository.create(user);
    }
}