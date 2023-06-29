import { PrivilegeLevel } from "./PrivilegeLevel";

export class LoginDTO {
    id: number

    uname: string

    passwd: string

    privilegeLevel: PrivilegeLevel

    constructor(username: string, password: string, privilegeLevel: PrivilegeLevel) {
        this.uname = username;
        this.passwd = password;
        this.privilegeLevel = privilegeLevel;
    }
}