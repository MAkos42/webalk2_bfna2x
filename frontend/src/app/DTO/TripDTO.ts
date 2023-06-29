import { TripPurpose } from "./TripPurpose";

export class TripDTO {

    driver: number

    vehicle: number

    date: string

    purpose: TripPurpose

    startLocation: string

    endLocation: string

    distance: number

    isReturnTrip: boolean

    constructor(driver: number, vehicle: number, date: string, purpose: TripPurpose, startLocation: string, endLocation: string, distance: number, isReturnTrip: boolean) {
        this.driver = driver
        this.vehicle = vehicle
        this.date = date
        this.purpose = purpose
        this.startLocation = startLocation
        this.endLocation = endLocation
        this.distance = distance
        this.isReturnTrip = isReturnTrip
    }

}