import { TripPurpose } from "./TripPurpose";

export class TripDTO {

    driver: string

    vehicle: string

    date: string

    purpose: TripPurpose

    startLocation: string

    endLocation: string

    distance: number

    isReturnTrip: boolean

    constructor(driver: string, vehicle: string, date: string, purpose: TripPurpose, startLocation: string, endLocation: string, distance: number, isReturnTrip: boolean) {
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