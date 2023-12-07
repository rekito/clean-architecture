import {Request, Response} from "express";
import {FindUserByEmail} from "../../application/FindUserByEmail";
import {Login} from "../../application/Login";
import {Jwt} from "../../../shared/domain/Jwt";
import {WrongCredentialsException} from "../../domain/exception/WrongCredentialsException";
import {container} from "../../container";

const findUserByEmailUseCase = container.get<FindUserByEmail>('FindUserByEmail');
const loginUseCase = container.get<Login>('Login');
const jwt = container.get<Jwt>('Jwt');

export async function loginUser(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        await loginUseCase.run(email, password);
        const user = await findUserByEmailUseCase.run(email);

        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        return res.status(200)
            .send({
                user: userData,
                token: jwt.sign(userData),
            });

    } catch (e) {
        if (e instanceof WrongCredentialsException) {
            return res.status(400)
                .send({ message: e.message });
        }

        return res.status(500)
            .send({ message: 'Internal server error' });
    }
}