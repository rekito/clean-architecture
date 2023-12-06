import {Exception} from "../shared/domain/Exception";

export class TaskNotFoundException extends Exception {
    constructor() {
        super("Task not found exception");
        this.name = TaskNotFoundException.name;
    }
}