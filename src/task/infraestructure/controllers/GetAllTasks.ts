import {Request, Response} from "express";
import {GetAllTasks} from "../../application/GetAllTasks";
import {container} from "../../container";

const getAllTasksUseCase = container.get<GetAllTasks>('GetAllTasks');

export async function getAllTasks(req: Request, res: Response) {
    try {
        const tasks = await getAllTasksUseCase.run();

        return res.status(200)
            .send({ tasks });
    } catch (e) {
        console.log(e);
        return res.status(500)
            .send({ message: 'Internal server error' });
    }
}