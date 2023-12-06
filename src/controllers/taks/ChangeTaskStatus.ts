
import { Request, Response } from 'express';
import {Task} from '../../domain/task/Task';
import {AppDataSource} from "../../db/connection";

export async function changeTaskStatus(req: Request, res: Response) {
    try {
        const repository = AppDataSource.getRepository(Task);

        const taskExist = await repository.findOne({
            where: { id: req.params.id }
        });

        if (!taskExist) {
            res.status(200)
                .send({ message: 'Task not found' })
        }

        await repository.update(req.params.id, {
            status: req.body.status
        });

        const task = await repository.findOne({
            where: { id: req.params.id }
        });

        res.status(200)
            .send({ data: task })
    } catch (e) {
        res.status(500)
            .send({
                error: 'INTERNAL SERVER ERROR'
            })
    }
}