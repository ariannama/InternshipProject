import { Entity, Column, PrimaryColumn, ManyToOne, BaseEntity } from "typeorm";
import { User } from "./User";

@Entity()
export class Token extends BaseEntity{

    @PrimaryColumn()
    access_token!: string;

    @Column()
    refresh_token!: string;

    @Column()
    credentials_id!: string;
    
    @ManyToOne(_ => User, user => user.tokens)
    user!: User;
}