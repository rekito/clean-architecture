import {UserRepository} from "../domain/UserRepository";
import {UserNotFoundException} from "../domain/exception/UserNotFoundException";
import {inject, injectable} from "inversify";

@injectable()
export class FindUserByEmail {
    constructor(@inject('UserRepository') private readonly userRepository: UserRepository) {}

    public async run(email: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UserNotFoundException();
        }

        return user;
    }
}