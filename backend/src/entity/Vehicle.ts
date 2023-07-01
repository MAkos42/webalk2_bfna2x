import { Entity, Column, ObjectIdColumn, ObjectId } from "typeorm"
import { Fuel } from "./Fuel"

@Entity("vehicles")
export class Vehicle {

    @ObjectIdColumn()
    id: ObjectId

    @Column("char", { length: 8, nullable: false, unique: true })
    regPlate: string

    @Column()
    type: string

    @Column("enum", { enum: Fuel })
    fuel: Fuel

    @Column("double")
    fuelEcon: number

    @Column()
    odometer: number

    constructor(
        regPlate: string, type: string, fuel: Fuel, fuelEcon: number, odometer: number) {
        this.regPlate = regPlate
        this.type = type
        this.fuel = fuel
        this.fuelEcon = fuelEcon
        this.odometer = odometer
    }

}
