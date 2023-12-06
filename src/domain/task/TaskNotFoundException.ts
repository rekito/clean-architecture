import {Exception} from "../shared/Exception";

export class TaskNotFoundException extends Exception {
    constructor() {
        super("Task not found");
        this.name = TaskNotFoundException.name;
    }
}