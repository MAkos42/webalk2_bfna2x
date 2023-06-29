import express = require("express");
import cors = require("cors");
import { AppDataSource } from "./data-source"
import { Driver } from "./entity/Driver";
import { Fuel } from "./entity/Fuel";
import { PrivilegeLevel } from "./entity/PrivilegeLevel";
import { Trip } from "./entity/Trip";
import { TripPurpose } from "./entity/TripPurpose";
import { Login } from "./entity/Login";
import { Vehicle } from "./entity/Vehicle";
import { VehiclesService } from "./service/VehiclesService";
import { DriversService } from "./service/DriversService";
import { TripsService } from './service/TripsService';
import { TripDTO } from "./DTO/TripDTO";
import { ReportRequest } from "./DTO/ReportRequest";

const app = express();

const dService = new DriversService();
const vService = new VehiclesService();
const tService = new TripsService();


app.use(express.json());

let corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions));

//#region Vehicles
app.get('/api/vehicles', async (req, res) => {
    try {
        const tableData = await vService.getVehicles();
        console.log('Returned entries:' + tableData.length);
        res.json(tableData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/getvehicle', async (req, res) => {
    try {
        const { id } = req.body;
        const vehicle = await vService.getVehicle(id);
        console.log(vehicle);
        res.json(vehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/getvehiclebyreg', async (req, res) => {
    try {
        const { regPlate } = req.body;
        const vehicle = await vService.getVehicleByRegPlate(regPlate);
        console.log(vehicle);
        res.json(vehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/savevehicle', async (req, res) => {
    try {
        const { id, regPlate, type, fuel, fuelEcon, odometer } = req.body;
        const newVehicle: Vehicle = new Vehicle(regPlate, type, fuel, fuelEcon, odometer)
        newVehicle.id = id;
        console.log(newVehicle);
        await vService.saveVehicle(newVehicle);

        res.json(newVehicle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//#endregion

//#region Drivers
app.get('/api/drivers', async (req, res) => {
    try {
        const tableData = await dService.getDrivers();
        console.log('Returned entries:' + tableData.length);
        res.json(tableData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/getdriver', async (req, res) => {
    try {
        const { id } = req.body;
        const driver = await dService.getDriver(id);
        console.log(driver);
        res.json(driver);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/getdriverbylicense', async (req, res) => {
    try {
        const { driversLicense } = req.body;
        console.log(driversLicense)
        const driver = await dService.getDriverByLicense(driversLicense);
        console.log(driver);
        res.json(driver);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/savedriver', async (req, res) => {
    try {
        const { id, name, dateOfBirth, address, driversLicense, idExpirationDate } = req.body;
        const newDriver: Driver = new Driver(name, new Date(Date.parse(dateOfBirth)), address, driversLicense, new Date(Date.parse(idExpirationDate)));
        newDriver.id = id;
        console.log(newDriver);
        await dService.saveDriver(newDriver);

        res.json(newDriver);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//#endregion

//#region Trips
app.get('/api/trips', async (req, res) => {
    try {
        const trips = await tService.getTrips();
        const tableData: TripDTO[] = [];
        trips.forEach(trip => {
            console.log(trip)
            console.log(new TripDTO(trip))
            tableData.push(new TripDTO(trip));
        })
        res.json(tableData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/report', async (req, res) => {
    try {
        const { vehicle, startDate, endDate } = req.body;
        const request = new ReportRequest(vehicle, startDate, endDate);
        const report = await tService.getReport(request);

        console.log(report);
        res.json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/savetrip', async (req, res) => {
    try {
        const { driver, vehicle, date, purpose, startLocation, endLocation, distance, isReturnTrip } = req.body;
        console.log('(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(req.body);
        const newTrip: TripDTO = new TripDTO(undefined, driver, vehicle, new Date(Date.parse(date)), purpose, startLocation, endLocation, distance, isReturnTrip);
        console.log(newTrip);
        await tService.saveTrip(newTrip);

        res.json(newTrip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//#endregion

app.listen(3000, () => {
    console.log('Server is listening at port 3000 ...');
});

AppDataSource.initialize().then(async () => {
    let newAdmin: Login = new Login("admin", "admin", PrivilegeLevel.ADMIN);
    newAdmin.id = 1;
    let newDriver: Driver = new Driver("Mészáros Ákos", new Date(2000, 9, 25), "valaholaföldön", "AB123456", new Date(2024, 1, 1));
    newDriver.id = 1;
    let newDriver2: Driver = new Driver("Balogh Gábor", new Date(1993, 11, 20), "Székesfehérvár", "XY123123", new Date(2023, 1, 1));
    newDriver2.id = 2;
    let newVehicle: Vehicle = new Vehicle("ABCD-111", "Honda Civic", Fuel.DIESEL, 6.2, 10000);
    newVehicle.id = 1;
    let newTrip: Trip = new Trip(newDriver, newVehicle, new Date(), TripPurpose.BUSINESS, "Miskolc", "Budapest", 182)
    newTrip.id = 1;


    await AppDataSource.manager.save(newAdmin);
    await AppDataSource.manager.save(newDriver);
    await AppDataSource.manager.save(newDriver2);
    await AppDataSource.manager.save(newVehicle);
    await AppDataSource.manager.save(newTrip);


    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => {
    console.log(error);
    //AppDataSource.destroy()
})
