import {DataSource} from "typeorm";
import {Task} from "../models/Task";
import {User} from "../models/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "christopher",
    password: "12345",
    database: "tasks",
    synchronize: true,
    subscribers: [],
    entities: [Task, User]
})