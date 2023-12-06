import {Task} from "./Task";

export interface TaskRepository {
    getAllTask(): Promise<Task[]>;
    findTaskById(id: string): Promise<Task | null>;
}