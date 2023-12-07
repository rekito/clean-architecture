import { Container } from 'inversify';
import {UserRepository} from "./user/domain/UserRepository";
import {PgUserRepository} from "./user/infraestructure/PgUserRepository";
import {CreateUser} from "./user/application/CreateUser";
import {FindUserByEmail} from "./user/application/FindUserByEmail";
import {UserEmailAlreadyTaken} from "./user/application/UserEmailAlreadyTaken";
import {VerifyUserPassword} from "./user/application/VerifyUserPassword";
import {Connection} from "./shared/domain/Connection";
import {DatabaseConnection} from "./shared/infraestructure/persistence/DatabaseConnection";
import {BcryptEncryption} from "./shared/domain/BcryptEncryption";
import {TaskRepository} from "./task/domain/TaskRepository";
import {PgTaskRepository} from "./task/infraestructure/repository/PgTaskRepository";
import {ChangeTaskStatus} from "./task/application/ChangeTaskStatus";
import {CreateTask} from "./task/application/CreateTask";
import {DeleteTaskById} from "./task/application/DeleteTaskById";
import {FindTaskById} from "./task/application/FindTaskById";
import {GetAllTasks} from "./task/application/GetAllTasks";
import {RandomId} from "./shared/domain/RandomId";
import {Login} from "./auth/application/Login";
import {Jwt} from "./shared/domain/Jwt";

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

/** TASK */
container.bind<TaskRepository>('TaskRepository')
    .to(PgTaskRepository);

container.bind<ChangeTaskStatus>('ChangeTaskStatus')
    .to(ChangeTaskStatus);

container.bind<CreateTask>('CreateTask')
    .to(CreateTask);

container.bind<DeleteTaskById>('DeleteTaskById')
    .to(DeleteTaskById);

container.bind<FindTaskById>('FindTaskById')
    .to(FindTaskById);

container.bind<GetAllTasks>('GetAllTasks')
    .to(GetAllTasks);
/** TASK */

/** AUTH */
container.bind<Login>('Login')
    .to(Login);

container.bind<Jwt>('Jwt')
    .to(Jwt);

export {
    container,
}