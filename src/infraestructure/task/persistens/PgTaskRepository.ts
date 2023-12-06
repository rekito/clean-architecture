import {TaskRepository} from "../../../domain/task/TaskRepository";
import {Task} from "../../../domain/task/Task";
import {AppDataSource} from "../../../db/connection";

export class PgTaskRepository implements TaskRepository {
    async getAllTask(): Promise<Task[]> {
        const repository = AppDataSource.getRepository(Task);
        const tasks = await repository.find();
        return tasks;
    }

    async findTaskById(id: string): Promise<Task | null> {
        const repository = AppDataSource.getRepository(Task);

        const task = await repository.findOne({
            where: { id }
        });

        return task;
    }
}