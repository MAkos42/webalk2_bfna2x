import "reflect-metadata"
import { DataSource } from "typeorm"
import { Vehicle } from "./entity/Vehicle"
import { Driver } from "./entity/Driver"
import { Trip } from "./entity/Trip"
import { Login } from "./entity/Login"

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: "mongodb://localhost:27017",
    database: "triplog",
    synchronize: true,
    logging: true,
    entities: [Vehicle, Driver, Login, Trip],
    migrations: [],
    subscribers: [],
})
