import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TripDTO } from '../DTO/TripDTO';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiclesProxyService } from '../services/vehicles-proxy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DriversProxyService } from '../services/drivers-proxy.service';
import { TripsProxyService } from '../services/trips-proxy.service';
import { DriverDTO } from '../DTO/DriverDTO';
import { VehicleDTO } from '../DTO/VehicleDTO';
import { TripPurpose } from '../DTO/TripPurpose';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  currentDate: Date = new Date();
  tripSource: MatTableDataSource<TripDTO>;
  driversList: DriverDTO[];
  vehiclesList: VehicleDTO[];
  eligibleDrivers: DriverDTO[] = [];

  displayedColumns: string[] = ['driver', 'vehicle', 'date', 'purpose', 'startLocation', 'endLocation', 'distance'];

  tripForm = new FormGroup({
    driver: new FormControl<number>(null, [Validators.required]),
    vehicle: new FormControl<number>(null, [Validators.required]),
    date: new FormControl<Date>(null, [Validators.required]),
    purpose: new FormControl<TripPurpose>(null, [Validators.required]),
    startLocation: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    endLocation: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    distance: new FormControl<number>(null, [Validators.required, Validators.min(0)]),
    isReturnTrip: new FormControl<boolean>(false)
  });


  constructor(private vehiclesProxyService: VehiclesProxyService, private driversProxyService: DriversProxyService,
    private tripsProxyService: TripsProxyService, private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.driversProxyService.getAllDrivers().subscribe(drivers => {
      console.log(drivers);
      this.driversList = drivers;
      this.driversList.forEach(driver => {
        if (this.currentDate.getTime() < Date.parse(driver.idExpirationDate))
          this.eligibleDrivers.push(driver);
      })
    });

    this.vehiclesProxyService.getAllVehicles().subscribe(vehicles => {
      console.log(vehicles);
      this.vehiclesList = vehicles;
    });

    this.tripsProxyService.getAllTrips().subscribe(data => {
      console.log(data);
      this.tripSource = new MatTableDataSource(data);
    });
  }

  displayDriver(id: number): string {
    let driver: DriverDTO = this.driversList.find(x => x.id === id);
    return driver.driversLicense + ' | ' + driver.name;
  }

  displayVehicle(id: number): string {
    let vehicle: VehicleDTO = this.vehiclesList.find(x => x.id === id);
    return vehicle.regPlate + ' | ' + vehicle.type;
  }

  onSubmit() {
    if (!this.tripForm.valid) {
      this.snackBar.open('Kérlek tölts ki minden mezőt megfelelően', 'Bezár', { duration: 2000 });
    }

    let formDriver = this.tripForm.value;
    console.log(formDriver);
    let newTrip = new TripDTO(formDriver.driver, formDriver.vehicle, formDriver.date.toISOString(), formDriver.purpose, formDriver.startLocation, formDriver.endLocation, formDriver.distance, formDriver.isReturnTrip);

    console.log(newTrip);
    let syncMagic = new Promise<void>((resolve) => {
      this.tripsProxyService.saveTrip(newTrip).subscribe(data => {
        console.log(data);
        resolve();
      });
    })

    syncMagic.then(() => {
      this.snackBar.open('Utazás sikeresen elmentve', 'Bezár', { duration: 2000 });
      this.tripForm.reset();
      this.loadData();
    })
  }



}
