import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import {getAllTasks} from "./infraestructure/controllers/GetAllTasks";
import {findTaskById} from "./infraestructure/controllers/FindTaskById";
import {createTask} from "./infraestructure/controllers/CreateTask";
import {deleteTaskById} from "./infraestructure/controllers/DeleteTaskById";
import {changeTaskStatus} from "./infraestructure/controllers/ChangeTaskStatus";

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
    console.log(`APP RUNNING IN PORT ${process.env.PORT}`);
})
