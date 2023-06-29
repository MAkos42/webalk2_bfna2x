import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("drivers")
export class Driver {

    @PrimaryGeneratedColumn({ name: "driverid" })
    id: number

    @Column()
    name: string

    @Column("date")
    dateOfBirth: Date

    @Column()
    address: string

    @Column("char", { unique: true, nullable: false, length: 8 })
    driversLicense: string

    @Column("date")
    idExpirationDate: Date

    constructor(name: string, dateOfBirth: Date, address: string, driversLicense: string, idExpirationDate: Date) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.driversLicense = driversLicense;
        this.idExpirationDate = idExpirationDate;
    }
}