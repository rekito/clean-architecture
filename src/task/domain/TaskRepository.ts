import {Task} from "./Task";

export interface TaskRepository {
    findAll(): Promise<Task[]>
    save(task: Task): Promise<void>
    findById(id: string): Promise<Task | null>;
    deleteById(id: string): Promise<void>;
    update(id: string, task: Partial<Task>): Promise<void>;
}