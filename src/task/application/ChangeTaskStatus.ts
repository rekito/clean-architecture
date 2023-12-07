import {TaskRepository} from "../domain/TaskRepository";
import {Task} from "../domain/Task";
import {inject, injectable} from "inversify";

@injectable()
export class ChangeTaskStatus {
    constructor(@inject('TaskRepository') private readonly taskRepository: TaskRepository) {}

    public run(id: string, task: Partial<Task>): Promise<void> {
        return this.taskRepository.update(id, task);
    }
}