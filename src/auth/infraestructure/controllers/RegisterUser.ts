import {Request, Response} from "express";
import {BcryptEncryption} from "../../../shared/domain/BcryptEncryption";
import {User} from "../../../user/domain/User";
import {RandomId} from "../../../shared/domain/RandomId";
import {EmailAlreadyInUseException} from "../../../user/domain/exception/EmailAlreadyInUseException";
import {CreateUser} from "../../../user/application/CreateUser";
import {PgUserRepository} from "../../../user/infraestructure/PgUserRepository";
import {DatabaseConnection} from "../../../shared/infraestructure/persistence/DatabaseConnection";
import {UserEmailAlreadyTaken} from "../../../user/application/UserEmailAlreadyTaken";
import {Register} from "../../application/Register";
import {Jwt} from "../../../shared/domain/Jwt";

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