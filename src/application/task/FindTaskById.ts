import {TaskRepository} from "../../domain/task/TaskRepository";
import {Task} from "../../domain/task/Task";
import {TaskNotFoundException} from "../../domain/task/TaskNotFoundException";

export class FindTaskById {
    constructor(private readonly taskRepository: TaskRepository) {}

    public async run(id: string): Promise<Task> {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new TaskNotFoundException();
        }

        return task;
    }
}