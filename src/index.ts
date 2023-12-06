import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import {registerUser} from "./infraestructure/controllers/auth/RegisterUser";
import {loginUser} from "./infraestructure/controllers/auth/LoginUser";
import {changeTaskStatus} from "./infraestructure/controllers/task/ChangeTaskStatus";
import {getAllTasks} from "./infraestructure/controllers/task/GetAllTasks";
import {findTaskById} from "./infraestructure/controllers/task/FindTaskById";
import {createTask} from "./infraestructure/controllers/task/CreateTask";
import {deleteTaskById} from "./infraestructure/controllers/task/DeleteTaskById";

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
