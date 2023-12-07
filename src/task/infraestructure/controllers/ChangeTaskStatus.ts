import {Request, Response} from "express";
import {FindTaskById} from "../../application/FindTaskById";
import {TaskNotFoundException} from "../../domain/TaskNotFoundException";
import {ChangeTaskStatus} from "../../application/ChangeTaskStatus";
import {container} from "../../../container";

const findTaskByIdUseCase = container.get<FindTaskById>('FindTaskById');
const changeTaskStatusUseCase = container.get<ChangeTaskStatus>('ChangeTaskStatus');

export async function changeTaskStatus(req: Request, res: Response) {
    try {
        const taskId = req.params.id;
        await changeTaskStatusUseCase.run(taskId, req.body);
        const task = await findTaskByIdUseCase.run(taskId);

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