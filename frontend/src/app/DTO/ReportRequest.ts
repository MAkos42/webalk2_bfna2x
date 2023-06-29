import { VehicleDTO } from "./VehicleDTO";

export class ReportRequest {
    vehicle: number;
    startDate: Date;
    endDate: Date;

    constructor(vehicle: number, startDate: Date, endDate: Date) {
        this.vehicle = vehicle;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}