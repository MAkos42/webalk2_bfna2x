import { Fuel } from "./Fuel"

export class VehicleDTO {

    id: number

    regPlate: string

    type: string

    fuel: Fuel

    fuelEcon: number

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
