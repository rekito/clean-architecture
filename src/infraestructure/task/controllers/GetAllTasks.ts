import { Request, Response } from 'express';
import {PgTaskRepository} from "../persistens/PgTaskRepository";
import {GetAllTasks} from "../../../application/task/GetAllTasks";

export async function getAllTasks(req: Request, res: Response) {
    try {
        const repository = new PgTaskRepository();
        const getAllTasks = new GetAllTasks(repository);
        const tasks = await getAllTasks.run();

        res.status(200)
            .send({ tasks });
    } catch (e) {
        res.status(500)
            .send({
                error: 'INTERNAL SERVER ERROR'
            })
    }
}