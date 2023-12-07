import {UserRepository} from "../domain/UserRepository";
import {inject, injectable} from "inversify";

@injectable()
export class UserEmailAlreadyTaken {
    constructor(@inject('UserRepository') private readonly userRepository: UserRepository) {}

    public async run(email: string): Promise<boolean> {
        const user = await this.userRepository.findByEmail(email);
        return user !== null;
    }
}