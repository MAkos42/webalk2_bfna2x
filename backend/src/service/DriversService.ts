import { AppDataSource } from "../data-source";
import { Driver } from "../entity/Driver";

export class DriversService {
    getDriverByLicense(license: string): Promise<Driver> {
        return AppDataSource.manager.findOneBy(Driver, { driversLicense: license });
    }

    getDriver(id: number): Promise<Driver> {
        return AppDataSource.manager.findOneBy(Driver, { id: id });


    }

    getDrivers(): Promise<Driver[]> {
        return AppDataSource.manager.find(Driver);
    }

    saveDriver(vehicle: Driver): Promise<Driver> {
        return AppDataSource.manager.save(Driver, vehicle);
    }
}