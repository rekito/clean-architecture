import {TaskRepository} from "../../domain/task/TaskRepository";
import {Task} from "../../domain/task/Task";
import {DatabaseConnection} from "./DatabaseConnection";


export class MysqlTaskRepository implements TaskRepository {
    constructor(private readonly databaseConnection: DatabaseConnection) {}

    async findAll(): Promise<Task[]> {
        return this.databaseConnection.query(Task).find();
    }

    async findById(id: string): Promise<Task | null> {
        return this.databaseConnection
            .query(Task)
            .findOne({
                where: { id }
            })
    }

    async deleteById(id: string): Promise<void> {
        await this.databaseConnection
            .query(Task)
            .delete(id);
    }

    async save(task: Task): Promise<void> {
        await this.databaseConnection
            .query(Task)
            .save(task);
    }

    async update(id: string, task: Partial<Task>): Promise<void> {
        await this.databaseConnection
            .query(Task)
            .update(id, task)
    }

}
