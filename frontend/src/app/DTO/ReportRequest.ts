import { VehicleDTO } from "./VehicleDTO";

export class ReportRequest {
    vehicle: string;
    startDate: string;
    endDate: string;

    constructor(vehicle: string, startDate: string, endDate: string) {
        this.vehicle = vehicle;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}