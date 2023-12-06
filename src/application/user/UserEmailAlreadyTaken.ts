import {UserRepository} from "../../domain/user/UserRepository";

export class UserEmailAlreadyTaken {
    constructor(private readonly userRepository: UserRepository) {}

    public async run(email: string): Promise<boolean> {
        const user = await this.userRepository.findByEmail(email);
        return user !== null;
    }
}