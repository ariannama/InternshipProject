import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm";
import { Token } from "./Token";

@Entity("users")
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string;

    @Column()
    password!: string;
    
    @OneToMany(_ => Token, credID => credID.user)
    tokens!: Token[];

}