import {UserRepository} from "../domain/UserRepository";
import {User} from "../domain/User";
import {inject, injectable} from "inversify";
import {DatabaseConnection} from "./DatabaseConnection";

@injectable()
export class PgUserRepository implements UserRepository {
    constructor(@inject('Connection') private databaseConnection: DatabaseConnection) {}

    async create(user: User): Promise<void> {
        await this.databaseConnection
            .query(User)
            .save(user);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.databaseConnection
            .query(User)
            .findOne({where: {email}});
    }

}