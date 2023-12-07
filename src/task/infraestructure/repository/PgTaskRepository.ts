import {TaskRepository} from "../../domain/TaskRepository";
import {Task} from "../../domain/Task";
import {DatabaseConnection} from "../DatabaseConnection";
import {inject, injectable} from "inversify";

@injectable()
export class PgTaskRepository implements TaskRepository {
    constructor(@inject('Connection') private readonly databaseConnection: DatabaseConnection) {}

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
