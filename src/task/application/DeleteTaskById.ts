import {TaskRepository} from "../domain/TaskRepository";
import {inject, injectable} from "inversify";

@injectable()
export class DeleteTaskById {
    constructor(@inject('TaskRepository') private readonly taskRepository: TaskRepository) {
    }

    public run(id: string): Promise<void> {
        return this.taskRepository.deleteById(id);
    }
}