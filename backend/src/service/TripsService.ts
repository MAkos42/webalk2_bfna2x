import { AppDataSource } from "../data-source";
import { Trip } from "../entity/Trip";
import { DriversService } from "./DriversService";
import { VehiclesService } from "./VehiclesService";
import { Vehicle } from "../entity/Vehicle";
import { ReportRequest } from "../DTO/ReportRequest";
import { Between } from "typeorm";
import { Report } from "../entity/Report";
import { ObjectId } from "mongodb";

export class TripsService {
    driverService: DriversService = new DriversService();
    vehiclesService: VehiclesService = new VehiclesService();

    getTrips(): Promise<Trip[]> {
        return AppDataSource.manager.find(Trip);
    }

    getReport(request: ReportRequest): Promise<void | Report> {
        console.log(request);

        return this.vehiclesService.getVehicle(request.vehicleId).then(vehicle => {
            console.log(vehicle)

            return AppDataSource.getMongoRepository(Trip).find({ where: { vehicle: vehicle._id, date: { $gte: request.startDate, $lte: request.endDate } } }).then(trips => {
                return new Report(vehicle, trips);
            })
        });
    }

    saveTrip(newTrip: Trip, isReturnTrip: boolean): Promise<void | Trip[]> {
        let newOdometer;
        let trips: Trip[] = [];
        console.log(newTrip.driver);

        return this.driverService.getDriver(newTrip.driver.toHexString()).then(driver => {
            console.log(driver);
            this.vehiclesService.getVehicle(newTrip.vehicle.toHexString()).then(vehicle => {
                trips.push(newTrip);

                newOdometer = vehicle.odometer + newTrip.distance;

                if (isReturnTrip) {
                    let returnTrip = new Trip(newTrip.driver, newTrip.vehicle, newTrip.date, newTrip.purpose, newTrip.endLocation, newTrip.startLocation, newTrip.distance);
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