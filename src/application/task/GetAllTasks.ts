import {TaskRepository} from "../../domain/task/TaskRepository";
import {Task} from "../../domain/task/Task";

export class GetAllTasks {
    constructor(private readonly taskRepository: TaskRepository) {}

    public run(): Promise<Task[]> {
        return this.taskRepository.findAll();
    }
}