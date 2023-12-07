import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Task {
    @PrimaryColumn()
    public id!: string;

    @Column()
    public title!: string;

    @Column()
    public description!: string;

    @Column({ default: 0 })
    public status!: number;

    public static create(params: { id: string, title: string, description: string, status: number }): Task {
        const task = new Task();

        task.id = params.id;
        task.title = params.title;
        task.description = params.description;
        task.status = params.status;

        return task;
    }
}