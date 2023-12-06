import {Request, Response} from "express";
import {DatabaseConnection} from "../../persistence/DatabaseConnection";
import {MysqlTaskRepository} from "../../persistence/MysqlTaskRepository";
import {DeleteTaskById} from "../../../application/task/DeleteTaskById";
import {FindTaskById} from "../../../application/task/FindTaskById";
import {TaskNotFoundException} from "../../../domain/task/TaskNotFoundException";

export async function deleteTaskById(req: Request, res: Response) {
    try {
        /** DEPENDENCIES */
        const databaseConnection = new DatabaseConnection();
        await databaseConnection.connect();
        const taskRepository = new MysqlTaskRepository(databaseConnection);
        const deleteTaskById = new DeleteTaskById(taskRepository);
        const findTaskById = new FindTaskById(taskRepository);
        /** DEPENDENCIES */

        const taskId = req.params.id;
        const task = await findTaskById.run(taskId);

        await deleteTaskById.run(taskId);

        return res.status(200)
            .send({ message: `Task with id: ${req.params.id} deleted` });
    } catch (e) {
        if (e instanceof TaskNotFoundException) {
            return res.status(404)
                .send({ message: e.message });
        }

        return res.status(500)
            .send({ message: 'Internal server error' });
    }
}