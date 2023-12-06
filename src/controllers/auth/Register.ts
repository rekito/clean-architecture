import {Request, Response} from "express";
import {AppDataSource} from "../../db/connection";
import {User} from "../../models/User";
import { v4 as uuid } from "uuid";
import { genSalt, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function register(req: Request, res: Response) {
    try {
        const { name, email, password } = req.body;
        const repository = AppDataSource.getRepository(User);

        const salt = await genSalt(10);

        const emailAlreadyInUse = await repository.findOne({
            where: { email }
        });

        if (emailAlreadyInUse) {
            return res.status(400)
                .send({
                    error: 'EMAIL ALREADY IN USE'
                })
        }

        const user = new User();

        user.id = uuid();
        user.name = name;
        user.email = email;
        user.password = await hash(password, salt);

        await repository.save(user);

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
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