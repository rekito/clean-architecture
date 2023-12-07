import { Container } from 'inversify';
import {Connection} from "../shared/domain/Connection";
import {DatabaseConnection} from "./infraestructure/DatabaseConnection";
import {BcryptEncryption} from "../shared/domain/BcryptEncryption";
import {TaskRepository} from "./domain/TaskRepository";
import {PgTaskRepository} from "./infraestructure/repository/PgTaskRepository";
import {ChangeTaskStatus} from "./application/ChangeTaskStatus";
import {CreateTask} from "./application/CreateTask";
import {DeleteTaskById} from "./application/DeleteTaskById";
import {FindTaskById} from "./application/FindTaskById";
import {GetAllTasks} from "./application/GetAllTasks";
import {RandomId} from "../shared/domain/RandomId";

const container = new Container();

/** SHARED */
container.bind<RandomId>('RandomId')
    .to(RandomId);

container.bind<Connection>('Connection')
    .to(DatabaseConnection);

container.bind<BcryptEncryption>('BcryptEncryption')
    .to(BcryptEncryption);
/** SHARED */

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

export {
    container,
}