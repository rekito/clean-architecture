import { Request, Response } from 'express';
import {AppDataSource} from "../../db/connection";
import {Task} from "../../models/Task";

export async function getAllTasks(req: Request, res: Response) {
    try {
        const repository = AppDataSource.getRepository(Task);
        const tasks = await repository.find();

        res.status(200)
            .send({ tasks });
    } catch (e) {
        res.status(500)
            .send({
                error: 'INTERNAL SERVER ERROR'
            })
    }
}