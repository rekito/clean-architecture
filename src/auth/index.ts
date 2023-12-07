import 'reflect-metadata';
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import {registerUser} from "./infraestructure/controllers/RegisterUser";
import {loginUser} from "./infraestructure/controllers/LoginUser";

config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', registerUser);
app.post('/login', loginUser);

app.listen(process.env.PORT, async () => {
    console.log(`APP RUNNING IN PORT ${process.env.PORT}`);
})
