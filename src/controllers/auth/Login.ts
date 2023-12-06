import {Request, Response} from "express";
import {AppDataSource} from "../../db/connection";
import {User} from "../../models/User";
import { compare } from "bcryptjs";
import {sign} from "jsonwebtoken";


export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const repository = AppDataSource.getRepository(User);

        const userExists = await repository.findOne({
            where: { email }
        });

        if (!userExists) {
            return res.status(400)
                .send({
                    error: 'WRONG CREDENTIALS'
                })
        }

        const isCorrectPassword = await compare(password, userExists.password);

        if (!isCorrectPassword) {
            return res.status(400)
                .send({
                    error: 'WRONG CREDENTIALS'
                })
        }

        const userData = {
            id: userExists.id,
            name: userExists.name,
            email: userExists.email,
        }

        res.status(200)
            .send({
                data: {
                    user: userData,
                    token: sign(userData, process.env.JWT_SECRET!)
                },
            })
    } catch (e) {
        res.status(500)
            .send({
                error: 'INTERNAL SERVER ERROR'
            })
    }
}