import {Connection} from "../../domain/shared/domain/Connection";
import {DataSource, EntityTarget} from "typeorm";
import {Task} from "../../domain/task/Task";
import {User} from "../../domain/user/User";

export class DatabaseConnection implements Connection {
    private appDataSource!: DataSource;

    async connect(): Promise<void> {
        this.appDataSource = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "christopher",
            password: "12345",
            database: "tasks",
            synchronize: true,
            subscribers: [],
            entities: [Task, User]
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