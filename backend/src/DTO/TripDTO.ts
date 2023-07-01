import { Trip } from "../entity/Trip"
import { TripPurpose } from "../entity/TripPurpose"

export class TripDTO {

    driver: string

    vehicle: string

    date: Date

    purpose: TripPurpose

    startLocation: string

    endLocation: string

    distance: number

    isReturnTrip: boolean

    constructor(trip?: Trip, driver?: string, vehicle?: string, date?: Date, purpose?: TripPurpose, startLocation?: string, endLocation?: string, distance?: number, isReturnTrip?: boolean) {
        if (trip !== undefined) {
            console.log(trip)
            this.driver = trip.driver._id.toHexString();
            this.vehicle = trip.vehicle._id.toHexString();
            this.date = trip.date;
            this.purpose = trip.purpose;
            this.startLocation = trip.startLocation;
            this.endLocation = trip.endLocation;
            this.distance = trip.distance;
        }

        if (driver !== undefined)
            this.driver = driver;
        if (vehicle !== undefined)
            this.vehicle = vehicle;
        if (date !== undefined)
            this.date = date;
        if (purpose !== undefined)
            this.purpose = purpose;
        if (startLocation !== undefined)
            this.startLocation = startLocation;
        if (endLocation !== undefined)
            this.endLocation = endLocation;
        if (distance !== undefined)
            this.distance = distance;
        if (isReturnTrip !== undefined)
            this.isReturnTrip = isReturnTrip;
    }

}