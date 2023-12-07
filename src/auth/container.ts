import { Container } from 'inversify';
import {Connection} from "../shared/domain/Connection";
import {DatabaseConnection} from "./infraestructure/DatabaseConnection";
import {BcryptEncryption} from "../shared/domain/BcryptEncryption";
import {RandomId} from "../shared/domain/RandomId";
import {UserRepository} from "./domain/UserRepository";
import {PgUserRepository} from "./infraestructure/PgUserRepository";
import {CreateUser} from "./application/CreateUser";
import {FindUserByEmail} from "./application/FindUserByEmail";
import {UserEmailAlreadyTaken} from "./application/UserEmailAlreadyTaken";
import {VerifyUserPassword} from "./application/VerifyUserPassword";
import {Login} from "./application/Login";
import {Jwt} from "../shared/domain/Jwt";

const container = new Container();

/** SHARED */
container.bind<RandomId>('RandomId')
    .to(RandomId);

container.bind<Connection>('Connection')
    .to(DatabaseConnection);

container.bind<BcryptEncryption>('BcryptEncryption')
    .to(BcryptEncryption);
/** SHARED */

/** USER */
container.bind<UserRepository>('UserRepository')
    .to(PgUserRepository)
    .inSingletonScope();

container.bind<CreateUser>('CreateUser')
    .to(CreateUser);

container.bind<FindUserByEmail>('FindUserByEmail')
    .to(FindUserByEmail);

container.bind<UserEmailAlreadyTaken>('UserEmailAlreadyTaken')
    .to(UserEmailAlreadyTaken);

container.bind<VerifyUserPassword>('VerifyUserPassword')
    .to(VerifyUserPassword);
/** USER */

/** AUTH */
container.bind<Login>('Login')
    .to(Login);

container.bind<Jwt>('Jwt')
    .to(Jwt);

export {
    container,
}