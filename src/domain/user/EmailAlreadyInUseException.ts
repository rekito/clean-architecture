import {Exception} from "../shared/domain/Exception";

export class EmailAlreadyInUseException extends Exception {
    constructor() {
        super('Email already taken');
        this.name = EmailAlreadyInUseException.name;
    }
}