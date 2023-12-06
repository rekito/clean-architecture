import {TaskRepository} from "../../domain/task/TaskRepository";

export class DeleteTaskById {
    constructor(private readonly taskRepository: TaskRepository) {
    }

    public run(id: string): Promise<void> {
        return this.taskRepository.deleteById(id);
    }
}