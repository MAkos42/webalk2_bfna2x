import { TripDTO } from "../DTO/TripDTO";
import { AppDataSource } from "../data-source";
import { Trip } from "../entity/Trip";
import { DriversService } from "./DriversService";
import { VehiclesService } from "./VehiclesService";
import { Vehicle } from "../entity/Vehicle";
import { ReportRequest } from "../DTO/ReportRequest";
import { Between } from "typeorm";
import { Report } from "../entity/Report";

export class TripsService {
    driverService: DriversService = new DriversService();
    vehiclesService: VehiclesService = new VehiclesService();

    getTrips(): Promise<Trip[]> {
        return AppDataSource.manager.find(Trip);
    }

    getReport(request: ReportRequest): Promise<void | Report> {
        return this.vehiclesService.getVehicle(request.vehicleId).then(vehicle => {

            return AppDataSource.manager.find(Trip, { where: { vehicle: vehicle, date: Between(request.startDate, request.endDate) } }).then(trips => {
                return new Report(vehicle, trips);
            })
        });
    }

    saveTrip(newTrip: TripDTO): Promise<void | Trip[]> {
        let newOdometer;
        let trips: Trip[] = [];
        let trip: Trip = new Trip(null, null, null, null, null, null, null);
        let returnTrip: Trip;
        console.log(newTrip.driver);

        return this.driverService.getDriver(newTrip.driver).then(driver => {
            console.log(driver); trip.driver = driver;
            this.vehiclesService.getVehicle(newTrip.vehicle).then(vehicle => {
                console.log(vehicle);
                trip.vehicle = vehicle;
                trip.date = newTrip.date;
                trip.purpose = newTrip.purpose;
                trip.startLocation = newTrip.startLocation;
                trip.endLocation = newTrip.endLocation;
                trip.distance = newTrip.distance;
                trips.push(trip);

                newOdometer = trip.vehicle.odometer + newTrip.distance;

                if (newTrip.isReturnTrip) {
                    returnTrip = new Trip(trip.driver, trip.vehicle, trip.date, trip.purpose, trip.endLocation, trip.startLocation, trip.distance);
                    newOdometer += newTrip.distance;
                    trips.push(returnTrip);
                }


                console.log(newOdometer);
                vehicle.odometer = newOdometer;
                AppDataSource.manager.save(Vehicle, vehicle);
                console.log('odometer saved');

                return AppDataSource.manager.save(Trip, trips);
            });
        });
    }
}