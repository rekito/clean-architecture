import {Request, Response} from "express";
import {AppDataSource} from "../../db/connection";
import {Task} from "../../models/Task";

export async function findTaskById(req: Request, res: Response) {
    try {
        const repository = AppDataSource.getRepository(Task);

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