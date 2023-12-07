import {Exception} from "../../../shared/domain/Exception";

export class UserNotFoundException extends Exception {
    constructor() {
        super("User not found");
        this.name = UserNotFoundException.name;
    }
}