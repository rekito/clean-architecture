import {UserRepository} from "../../domain/user/UserRepository";
import {UserNotFoundException} from "../../domain/user/UserNotFoundException";

export class FindUserByEmail {
    constructor(private readonly userRepository: UserRepository) {}

    public async run(email: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UserNotFoundException();
        }

        return user;
    }
}