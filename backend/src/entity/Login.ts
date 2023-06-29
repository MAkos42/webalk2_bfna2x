import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { PrivilegeLevel } from './PrivilegeLevel';

@Entity("users")
export class Login {
    @PrimaryGeneratedColumn({ name: "userid" })
    id: number

    @Column()
    uname: string

    @Column()
    passwd: string

    @Column("enum", { enum: PrivilegeLevel })
    privilegeLevel: PrivilegeLevel

    constructor(username: string, password: string, privilegeLevel: PrivilegeLevel) {
        this.uname = username;
        this.passwd = password;
        this.privilegeLevel = privilegeLevel;
    }
}