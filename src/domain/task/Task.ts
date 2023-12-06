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
}