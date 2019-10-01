import { User } from "../models/user.interface";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class UserEntity extends BaseEntity implements User  {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastname: string;
    @Column()
    age: number;
    @Column()
    balance: number;
    @Column()
    imageUrl: string;


}