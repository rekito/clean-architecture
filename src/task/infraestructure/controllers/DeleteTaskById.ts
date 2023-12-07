import {Request, Response} from "express";
import {DeleteTaskById} from "../../application/DeleteTaskById";
import {TaskNotFoundException} from "../../domain/TaskNotFoundException";
import {container} from "../../container";

const deleteTaskByIdUseCase = container.get<DeleteTaskById>('DeleteTaskById');

export async function deleteTaskById(req: Request, res: Response) {
    try {
        const taskId = req.params.id;
        await deleteTaskByIdUseCase.run(taskId);

        return res.status(200)
            .send({ message: `Task with id: ${req.params.id} deleted` });
    } catch (e) {
        if (e instanceof TaskNotFoundException) {
            return res.status(404)
                .send({ message: e.message });
        }

        return res.status(500)
            .send({ message: 'Internal server error' });
    }
}