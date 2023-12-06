import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import {AppDataSource} from "./db/connection";
import {createTask} from "./controllers/taks/CreateTask";
import {getAllTasks} from "./controllers/taks/GetAllTasks";
import {findTaskById} from "./controllers/taks/FindTaskById";
import {deleteTaskById} from "./controllers/taks/DeleteTaskById";
import {changeTaskStatus} from "./controllers/taks/ChangeTaskStatus";

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/all-tasks', getAllTasks);
app.get('/task/:id', findTaskById);
app.post('/create-task', createTask);
app.delete('/task/:id', deleteTaskById);
app.patch('/task/:id', changeTaskStatus);

app.listen(process.env.PORT, async () => {
    await AppDataSource.initialize()
    console.log(`APP RUNNING IN PORT ${process.env.PORT}`);
})