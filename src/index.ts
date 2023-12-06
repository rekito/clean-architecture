import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import {AppDataSource} from "./db/connection";
import {createTask} from "./controllers/taks/CreateTask";
import {findTaskById} from "./infraestructure/task/controllers/FindTaskById";
import {deleteTaskById} from "./controllers/taks/DeleteTaskById";
import {changeTaskStatus} from "./controllers/taks/ChangeTaskStatus";
import {register} from "./controllers/auth/Register";
import {login} from "./controllers/auth/Login";

import {getAllTasks} from "./infraestructure/task/controllers/GetAllTasks";

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

app.post('/register', register);
app.post('/login', login);

app.listen(process.env.PORT, async () => {
    await AppDataSource.initialize()
    console.log(`APP RUNNING IN PORT ${process.env.PORT}`);
})