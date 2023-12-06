import {TaskRepository} from "../../domain/task/TaskRepository";
import {Task} from "../../domain/task/Task";

export class CreateTask {
    constructor(private readonly taskRepository: TaskRepository) {}

    public run(task: Task): Promise<void> {
        return this.taskRepository.save(task);
    }
}