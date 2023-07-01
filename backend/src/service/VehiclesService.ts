import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Vehicle } from "../entity/Vehicle";

export class VehiclesService {
    getVehicleByRegPlate(regPlate: string): Promise<Vehicle> {
        return AppDataSource.manager.findOneBy(Vehicle, { regPlate: regPlate });
    }

    getVehicle(id: string): Promise<Vehicle> {
        return AppDataSource.getMongoRepository(Vehicle).findOne({ where: { _id: ObjectId.createFromHexString(id) } });


    }

    getVehicles(): Promise<Vehicle[]> {
        return AppDataSource.manager.find(Vehicle);
    }

    saveVehicle(vehicle: Vehicle): Promise<Vehicle> {
        return AppDataSource.getMongoRepository(Vehicle).save(vehicle);
    }
}