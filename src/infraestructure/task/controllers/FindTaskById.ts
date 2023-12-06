import {Request, Response} from "express";
import {AppDataSource} from "../../../db/connection";
import {Task} from "../../../domain/task/Task";
import {TaskNotFoundException} from "../../../domain/task/TaskNotFoundException";
import {FindTaskById} from "../../../application/task/FindTaskById";
import {PgTaskRepository} from "../persistens/PgTaskRepository";

export async function findTaskById(req: Request, res: Response) {
    try {
        const taskRepository = new PgTaskRepository();
        const findTaskById = new FindTaskById(taskRepository);
        const task = await findTaskById.run(req.params.id);

        res.status(200)
            .send({ data: task })
    } catch (e) {
        if (e instanceof TaskNotFoundException) {
            return res.status(404)
                .send({ message: e.message });
        }

        res.status(500)
            .send({
                error: 'INTERNAL SERVER ERROR'
            })
    }
}