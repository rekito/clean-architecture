import {DatabaseConnection} from "../../shared/infraestructure/persistence/DatabaseConnection";
import {UserRepository} from "../domain/UserRepository";
import {User} from "../domain/User";
import {inject, injectable} from "inversify";

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