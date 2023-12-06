import {Request, Response} from "express";
import {AppDataSource} from "../../db/connection";
import {Task} from "../../models/Task";

export async function deleteTaskById(req: Request, res: Response) {
    try {
        const repository = AppDataSource.getRepository(Task);

        const taskExist = await repository.findOne({
            where: { id: req.params.id }
        });

        if (taskExist) {
            await repository.delete(req.params.id);

            res.status(200)
                .send({ message: `Task with id: ${req.params.id} deleted` })
        } else {
            res.status(200)
                .send({ message: 'Task not found' })
        }

    } catch (e) {
        res.status(500)
            .send({
                error: 'INTERNAL SERVER ERROR'
            })
    }
}