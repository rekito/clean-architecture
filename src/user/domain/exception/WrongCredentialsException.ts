import {Exception} from "../../../shared/domain/Exception";

export class WrongCredentialsException extends Exception {
    constructor() {
        super('Wrong credentials');
        this.name = WrongCredentialsException.name;
    }
}