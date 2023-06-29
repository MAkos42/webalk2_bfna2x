import { Trip } from "./Trip";
import { Vehicle } from "./Vehicle";

export class Report {
    distance: number = 0;
    fuelConsumption: number;
    flatRate: number;
    sum: number;

    constructor(vehicle: Vehicle, trips: Trip[]) {
        trips.forEach(trip => this.distance += trip.distance)

        this.fuelConsumption = Math.round(this.distance * vehicle.fuelEcon / 100);
        this.flatRate = this.distance * 10;
        this.sum = this.fuelConsumption + this.flatRate;
    }
}