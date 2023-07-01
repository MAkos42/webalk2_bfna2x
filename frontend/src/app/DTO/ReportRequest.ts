import { VehicleDTO } from "./VehicleDTO";

export class ReportRequest {
    vehicle: string;
    startDate: Date;
    endDate: Date;

    constructor(vehicle: string, startDate: Date, endDate: Date) {
        this.vehicle = vehicle;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}