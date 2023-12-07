import {Request, Response} from "express";
import {BcryptEncryption} from "../../../shared/domain/BcryptEncryption";
import {User} from "../../domain/User";
import {RandomId} from "../../../shared/domain/RandomId";
import {EmailAlreadyInUseException} from "../../domain/exception/EmailAlreadyInUseException";
import {CreateUser} from "../../application/CreateUser";
import {PgUserRepository} from "../PgUserRepository";
import {UserEmailAlreadyTaken} from "../../application/UserEmailAlreadyTaken";
import {Register} from "../../application/Register";
import {Jwt} from "../../../shared/domain/Jwt";
import {DatabaseConnection} from "../DatabaseConnection";

export async function registerUser(req: Request, res: Response) {
    /** DEPENDENCIES */
    const databaseConnection = new DatabaseConnection();

    await databaseConnection.connect();

    const userRepository = new PgUserRepository(databaseConnection);
    const userEmailAlreadyTaken = new UserEmailAlreadyTaken(userRepository);

    const createUser = new CreateUser(userRepository);
    const encryptPassword = new BcryptEncryption();
    const randomId = new RandomId();
    const register = new Register(createUser, userEmailAlreadyTaken);
    const jwt = new Jwt();
    /** DEPENDENCIES */

    try {
        const { email, name, password } = req.body;
        const encryptedPassword = await encryptPassword.encrypt(password);

        const user = User.create({
            name,
            email,
            id: randomId.create(),
            password: encryptedPassword,
        });

        await register.run(user);

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
        if (e instanceof EmailAlreadyInUseException) {
            return res.status(400)
                .send({ message: e.message });
        }

        return res.status(500)
            .send({ message: 'Internal server error' });
    }
}