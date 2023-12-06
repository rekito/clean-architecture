import {Request, Response} from "express";
import {RandomId} from "../../../domain/shared/domain/RandomId";
import {DatabaseConnection} from "../../persistence/DatabaseConnection";
import {MysqlTaskRepository} from "../../persistence/MysqlTaskRepository";
import {Task} from "../../../domain/task/Task";
import {CreateTask} from "../../../application/task/CreateTask";

export async function createTask(req: Request, res: Response) {
    try {
        /** DEPENDENCIES */
        const databaseConnection = new DatabaseConnection();
        await databaseConnection.connect();
        const randomId = new RandomId();
        const taskRepository = new MysqlTaskRepository(databaseConnection);
        const createTask = new CreateTask(taskRepository);
        /** DEPENDENCIES */

        const { title, description } = req.body;

        const task = Task.create({
            title,
            description,
            id: randomId.create(),
            status: 0,
        });

        await createTask.run(task);

        return res.status(200)
            .send({ task });
    } catch (e) {
        return res.status(500)
            .send({ message: 'Internal server error' });
    }
}