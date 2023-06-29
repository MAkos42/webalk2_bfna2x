import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DriverDTO } from '../DTO/DriverDTO';
import { DriversProxyService } from '../services/drivers-proxy.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  private routerEventSubscription: Subscription;
  licenseUsedError: boolean = false;
  editMode: boolean = false;
  currentDate: Date = new Date();
  selectedDriver: DriverDTO = new DriverDTO(null, null, null, null, null);


  driverSource: MatTableDataSource<DriverDTO>;
  displayedColumns: string[] = ['name', 'dateOfBirth', 'address', 'driversLicense', 'idExpirationDate', 'extra'];

  driverForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern('^[A-z]{2}[\\d]{7}$')]),
    dateOfBirth: new FormControl<Date>(null, Validators.required),
    address: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    driversLicense: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    idExpirationDate: new FormControl<Date>(null, Validators.required)
  });

  constructor(private driversProxyService: DriversProxyService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.routerEventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Call your function here
        this.ngOnInit();
      }
    })
  }

  ngOnInit() {
    this.loadData();

    console.log(this.currentDate.toDateString());

    let id: number;
    this.route.params.subscribe(
      (params: Params) => {
        id = params['id'];
      }
    )

    if (id == null) { //return if no id
      return;
    }
    let syncMagic = new Promise<void>((resolve) => {
      this.driversProxyService.getDriver(id).subscribe(driver => {
        this.selectedDriver = driver;
        this.selectedDriver.dateOfBirth = driver.dateOfBirth;
        console.log(driver);
        console.log(this.selectedDriver);
        resolve();
      })
    })
    syncMagic.then(() => {
      if (this.selectedDriver == null)
        return;
      console.log('setting value');
      this.driverForm.setValue({
        name: this.selectedDriver.name,
        dateOfBirth: new Date(Date.parse(this.selectedDriver.dateOfBirth)),
        address: this.selectedDriver.address,
        driversLicense: this.selectedDriver.driversLicense,
        idExpirationDate: new Date(Date.parse(this.selectedDriver.idExpirationDate))
      })
      this.editMode = true;

      console.log(this.selectedDriver.idExpirationDate);
    })
  }

  loadData() {
    this.driversProxyService.getAllDrivers().subscribe(data => {
      console.log(data);
      this.driverSource = new MatTableDataSource(data);
    });
  }

  onRowClicked(row) {
    this.router.navigate(['/drivers/', row.id]);
  }

  clearSelected() {
    this.router.navigate(['/drivers/']);
  }

  getTime(date: string): number {
    return Date.parse(date);
  }

  onSubmit() {
    this.licenseUsedError = false;
    if (!this.driverForm.valid) {
      this.snackBar.open('Kérlek tölts ki minden mezőt megfelelően', 'Bezár', { duration: 2000 });
    }

    let formDriver = this.driverForm.value;
    let syncMagic = new Promise<void>((resolve) => {               //syncronisation black magic
      this.driversProxyService.getDriverByLicense(formDriver.driversLicense).subscribe(vehicle => {
        console.log(vehicle);
        if (vehicle != null) {
          this.licenseUsedError = true;
        }
        resolve();
      })
    })
    syncMagic.then(() => {
      console.log(this.licenseUsedError);
      if (!this.editMode && this.licenseUsedError) {
        this.driverForm.controls['driversLicense'].setErrors({ licenseInUse: true });
        this.snackBar.open('A megadott jogosítványszám már létezik a rendszerben', 'Bezár', { duration: 2000 });
        return;
      }

      if (this.selectedDriver == null)
        this.selectedDriver = new DriverDTO(null, null, null, null, null);
      this.selectedDriver.name = formDriver.name;
      this.selectedDriver.driversLicense = formDriver.driversLicense.toUpperCase();
      this.selectedDriver.dateOfBirth = formDriver.dateOfBirth.toISOString();
      this.selectedDriver.address = formDriver.address;
      this.selectedDriver.idExpirationDate = formDriver.idExpirationDate.toISOString();

      console.log(this.selectedDriver);
      let nestedSyncMagic = new Promise<void>((resolve) => {
        this.driversProxyService.saveVehicle(this.selectedDriver).subscribe(data => {
          console.log(data);
          resolve();
        });
      })

      nestedSyncMagic.then(() => {

        this.snackBar.open('Sofőr sikeresen elmentve', 'Bezár', { duration: 2000 });
        if (!this.editMode)
          this.driverForm.reset();
        this.loadData();
      })
    })
  }



}
