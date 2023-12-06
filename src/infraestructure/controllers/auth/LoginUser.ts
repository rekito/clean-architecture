import {Request, Response} from "express";
import {DatabaseConnection} from "../../persistence/DatabaseConnection";
import {MysqlUserRepository} from "../../persistence/MysqlUserRepository";
import {FindUserByEmail} from "../../../application/user/FindUserByEmail";
import {VerifyUserPassword} from "../../../application/user/VerifyUserPassword";
import {BcryptEncryption} from "../../../domain/shared/domain/BcryptEncryption";
import {Login} from "../../../application/auth/Login";
import {WrongCredentialsException} from "../../../domain/user/WrongCredentialsException";
import {Jwt} from "../../../domain/shared/domain/Jwt";

export async function loginUser(req: Request, res: Response) {
    try {
        /** DEPENDENCIES */
        const databaseConnection = new DatabaseConnection();

        await databaseConnection.connect();

        const userRepository = new MysqlUserRepository(databaseConnection);
        const findUserByEmail = new FindUserByEmail(userRepository);
        const bcryptEncryption = new BcryptEncryption();
        const verifyUserPassword = new VerifyUserPassword(bcryptEncryption);
        const jwt = new Jwt();

        const login = new Login(verifyUserPassword, findUserByEmail);
        /** DEPENDENCIES */

        const { email, password } = req.body;

        await login.run(email, password);

        const user = await findUserByEmail.run(email);

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