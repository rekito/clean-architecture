import {UserRepository} from "../../domain/user/UserRepository";
import {User} from "../../domain/user/User";
import {DatabaseConnection} from "./DatabaseConnection";

export class MysqlUserRepository implements UserRepository {
    constructor(private databaseConnection: DatabaseConnection) {}

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