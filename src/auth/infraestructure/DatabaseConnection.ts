import {Connection} from "../../shared/domain/Connection";
import {DataSource, EntityTarget} from "typeorm";
import {User} from "../domain/User";
import {injectable} from "inversify";

@injectable()
export class DatabaseConnection implements Connection {
    private appDataSource!: DataSource;

    constructor() {
        this.connect();
    }

    async connect(): Promise<void> {
        this.appDataSource = new DataSource({
            type: "postgres",
            host: "postgres-db",
            port: 5432,
            username: "christopher",
            password: "12345",
            database: "tasks",
            synchronize: true,
            subscribers: [],
            entities: [User]
        });

        await this.appDataSource.initialize();
    }

    async disconnect(): Promise<void> {
        return this.appDataSource.destroy();
    }

    query(entity: EntityTarget<any>) {
        return this.appDataSource.getRepository(entity);
    }
}