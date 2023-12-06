import {TaskRepository} from "../../domain/task/TaskRepository";
import {Task} from "../../domain/task/Task";

export class GetAllTasks {
    constructor(private readonly taskRepository: TaskRepository) {}

    public async run(): Promise<Task[]> {
        const tasks = await this.taskRepository.getAllTask();
        return tasks;
    }
}