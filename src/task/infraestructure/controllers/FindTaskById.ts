import {Request, Response} from "express";
import {FindTaskById} from "../../application/FindTaskById";
import {TaskNotFoundException} from "../../domain/TaskNotFoundException";
import {container} from "../../../container";

const findTaskByIdUseCase = container.get<FindTaskById>('FindTaskById');

export async function findTaskById(req: Request, res: Response) {
    try {
        const task = await findTaskByIdUseCase.run(req.params.id);

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