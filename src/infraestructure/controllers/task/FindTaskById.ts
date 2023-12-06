import {Request, Response} from "express";
import {DatabaseConnection} from "../../persistence/DatabaseConnection";
import {MysqlTaskRepository} from "../../persistence/MysqlTaskRepository";
import {FindTaskById} from "../../../application/task/FindTaskById";
import {TaskNotFoundException} from "../../../domain/task/TaskNotFoundException";

export async function findTaskById(req: Request, res: Response) {
    try {
        /** DEPENDENCIES */
        const databaseConnection = new DatabaseConnection();
        await databaseConnection.connect();
        const taskRepository = new MysqlTaskRepository(databaseConnection);
        const findTaskById = new FindTaskById(taskRepository);
        /** DEPENDENCIES */

        const task = await findTaskById.run(req.params.id);

        return res.status(200)
            .send({ task });
    } catch (e) {
        if (e instanceof TaskNotFoundException) {
            return res.status(404)
                .send({ message: e.message });
        }

        return res.status(500)
            .send({ message: 'Internal server error' });
    }
}