import { TripDTO } from "./TripDTO";
import { VehicleDTO } from "./VehicleDTO";

export class ReportDTO {
    distance: number = 0;
    fuelConsumption: number;
    flatRate: number;
    sum: number;

    constructor(vehicle: VehicleDTO, trips: TripDTO[]) {
        trips.forEach(trip => this.distance += trip.distance)

        this.fuelConsumption = Math.round(this.distance * vehicle.fuelEcon / 100);
        this.flatRate = this.distance * 10;
        this.sum = this.fuelConsumption + this.flatRate;
    }
}