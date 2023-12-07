import {Request, Response} from "express";
import {RandomId} from "../../../shared/domain/RandomId";
import {Task} from "../../domain/Task";
import {CreateTask} from "../../application/CreateTask";
import {container} from "../../../container";

const randomId = container.get<RandomId>('RandomId');
const createTaskUseCase = container.get<CreateTask>('CreateTask');

export async function createTask(req: Request, res: Response) {
    try {
        const {
            title,
            description,
        } = req.body;

        const task = Task.create({
            title,
            description,
            id: randomId.create(),
            status: 0,
        });

        await createTaskUseCase.run(task);

        return res.status(200)
            .send({ task });
    } catch (e) {
        return res.status(500)
            .send({ message: 'Internal server error' });
    }
}