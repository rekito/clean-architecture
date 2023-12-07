import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import {registerUser} from "./auth/infraestructure/controllers/RegisterUser";
import {loginUser} from "./auth/infraestructure/controllers/LoginUser";
import {changeTaskStatus} from "./task/infraestructure/controllers/ChangeTaskStatus";
import {getAllTasks} from "./task/infraestructure/controllers/GetAllTasks";
import {findTaskById} from "./task/infraestructure/controllers/FindTaskById";
import {createTask} from "./task/infraestructure/controllers/CreateTask";
import {deleteTaskById} from "./task/infraestructure/controllers/DeleteTaskById";

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

app.post('/register', registerUser);
app.post('/login', loginUser);

app.listen(process.env.PORT, async () => {
    console.log(`APP RUNNING IN PORT ${process.env.PORT}`);
})
