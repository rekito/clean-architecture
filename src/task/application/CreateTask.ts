import {TaskRepository} from "../domain/TaskRepository";
import {Task} from "../domain/Task";
import {inject, injectable} from "inversify";

@injectable()
export class CreateTask {
    constructor(@inject('TaskRepository') private readonly taskRepository: TaskRepository) {}

    public run(task: Task): Promise<void> {
        return this.taskRepository.save(task);
    }
}