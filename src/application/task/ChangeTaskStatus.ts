import {TaskRepository} from "../../domain/task/TaskRepository";
import {Task} from "../../domain/task/Task";

export class ChangeTaskStatus {
    constructor(private readonly taskRepository: TaskRepository) {}

    public run(id: string, task: Partial<Task>): Promise<void> {
        return this.taskRepository.update(id, task);
    }
}