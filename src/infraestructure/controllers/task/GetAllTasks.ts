import {Request, Response} from "express";
import {DatabaseConnection} from "../../persistence/DatabaseConnection";
import {MysqlTaskRepository} from "../../persistence/MysqlTaskRepository";
import {GetAllTasks} from "../../../application/task/GetAllTasks";

export async function getAllTasks(req: Request, res: Response) {
    try {
        /** DEPENDENCIES */
        const databaseConnection = new DatabaseConnection();
        await databaseConnection.connect();
        const taskRepository = new MysqlTaskRepository(databaseConnection);
        const getAllTasks = new GetAllTasks(taskRepository);
        /** DEPENDENCIES */

        const tasks = await getAllTasks.run();

        return res.status(200)
            .send({ tasks });
    } catch (e) {
        return res.status(500)
            .send({ message: 'Internal server error' });
    }
}