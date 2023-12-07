import {TaskRepository} from "../domain/TaskRepository";
import {Task} from "../domain/Task";
import {TaskNotFoundException} from "../domain/TaskNotFoundException";
import {inject, injectable} from "inversify";

@injectable()
export class FindTaskById {
    constructor(@inject('TaskRepository') private readonly taskRepository: TaskRepository) {}

    public async run(id: string): Promise<Task> {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new TaskNotFoundException();
        }

        return task;
    }
}