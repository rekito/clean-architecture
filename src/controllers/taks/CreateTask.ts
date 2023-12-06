import { Request, Response } from 'express';
import {Task} from '../../domain/task/Task';
import { v4 as uui } from 'uuid';
import {AppDataSource} from "../../db/connection";

export async function createTask(req: Request, res: Response) {
    try {
        const task = new Task();
        const { title, description } = req.body;
        const repository = AppDataSource.getRepository(Task);

        task.id = uui();
        task.title = title;
        task.description = description;

        await repository.save(task);

        res.status(200)
            .send({ data: task });

    } catch (e) {
        res.status(500)
            .send({
                error: 'INTERNAL SERVER ERROR'
            })
    }
}