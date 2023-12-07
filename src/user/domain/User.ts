import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    public id!: string;

    @Column()
    public name!: string;

    @Column()
    public email!: string;

    @Column()
    public password!: string;

    public static create(params: { id: string, name: string, email: string, password: string }): User {
        const user = new User();

        user.id = params.id;
        user.name = params.name;
        user.email = params.email;
        user.password = params.password;

        return user;
    }
}