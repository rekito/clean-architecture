import {TaskRepository} from "../domain/TaskRepository";
import {Task} from "../domain/Task";
import {inject, injectable} from "inversify";

@injectable()
export class GetAllTasks {
    constructor(@inject('TaskRepository') private readonly taskRepository: TaskRepository) {}

    public run(): Promise<Task[]> {
        return this.taskRepository.findAll();
    }
}