import { AppDataSource } from "../data-source";
import { Vehicle } from "../entity/Vehicle";

export class VehiclesService {
    getVehicleByRegPlate(regPlate: string): Promise<Vehicle> {
        return AppDataSource.manager.findOneBy(Vehicle, { regPlate: regPlate });
    }

    getVehicle(id: number): Promise<Vehicle> {
        return AppDataSource.manager.findOneBy(Vehicle, { id: id });


    }

    getVehicles(): Promise<Vehicle[]> {
        return AppDataSource.manager.find(Vehicle);
    }

    saveVehicle(vehicle: Vehicle): Promise<Vehicle> {
        return AppDataSource.manager.save(Vehicle, vehicle);
    }
}