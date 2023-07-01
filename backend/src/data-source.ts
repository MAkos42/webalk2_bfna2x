import "reflect-metadata"
import { DataSource } from "typeorm"
import { Vehicle } from "./entity/Vehicle"
import { Driver } from "./entity/Driver"
import { Trip } from "./entity/Trip"

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: "mongodb://127.0.0.1:27017",
    database: "triplog",
    synchronize: true,
    logging: true,
    entities: [Vehicle, Driver, Trip],
    migrations: [],
    subscribers: [],
})
