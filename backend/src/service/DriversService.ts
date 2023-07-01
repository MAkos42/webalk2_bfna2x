import { ObjectId } from "mongodb";
import { AppDataSource } from "../data-source";
import { Driver } from "../entity/Driver";

export class DriversService {
    getDriverByLicense(license: string): Promise<Driver> {
        return AppDataSource.manager.findOneBy(Driver, { driversLicense: license });
    }

    getDriver(id: string): Promise<Driver> {
        return AppDataSource.getMongoRepository(Driver).findOne({ where: { _id: ObjectId.createFromHexString(id) } });
    }

    getDrivers(): Promise<Driver[]> {
        return AppDataSource.manager.find(Driver);
    }

    saveDriver(driver: Driver): Promise<Driver> {
        return AppDataSource.getMongoRepository(Driver).save(driver);
    }
}