export class ReportRequest {
    vehicleId: string;
    startDate: Date;
    endDate: Date;

    constructor(vehicle: string, startDate: Date, endDate: Date) {
        this.vehicleId = vehicle
        this.startDate = startDate
        this.endDate = endDate
    }
}