export class ReportRequest {
    vehicleId: number;
    startDate: Date;
    endDate: Date;

    constructor(vehicle: number, startDate: Date, endDate: Date) {
        this.vehicleId = vehicle
        this.startDate = startDate
        this.endDate = endDate
    }
}