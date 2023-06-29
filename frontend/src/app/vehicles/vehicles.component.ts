import { Component, OnInit, } from '@angular/core';
import { VehiclesProxyService } from '../services/vehicles-proxy.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleDTO } from '../DTO/VehicleDTO';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Fuel } from '../DTO/Fuel';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  private routerEventSubscription: Subscription;
  plateUsedError: boolean = false;
  editMode: boolean = false;
  selectedVehicle: VehicleDTO;

  vehicleSource: MatTableDataSource<VehicleDTO>;
  displayedColumns: string[] = ['regPlate', 'type', 'fuel', 'fuelEcon', 'odometer', 'extra'];

  vehicleForm = new FormGroup({
    regPlate: new FormControl(null, [Validators.required, Validators.pattern('^[A-z]{3,4}-[\\d]{3}$')]),
    type: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
    fuel: new FormControl<Fuel>(null, Validators.required),
    fuelEcon: new FormControl<number>(null, [Validators.required, Validators.min(0)]),
    odometer: new FormControl<number>(null, [Validators.required, Validators.min(0)])
  });

  constructor(private vehiclesProxyService: VehiclesProxyService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
    this.routerEventSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Call your function here
        this.ngOnInit();
      }
    })
  }

  ngOnInit() {
    this.loadData();

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
      this.vehiclesProxyService.getVehicle(id).subscribe(vehicle => {
        this.selectedVehicle = vehicle;
        console.log(this.selectedVehicle);
        resolve();
      })
    })
    syncMagic.then(() => {
      if (this.selectedVehicle == null)
        return;

      this.vehicleForm.setValue({
        regPlate: this.selectedVehicle.regPlate,
        type: this.selectedVehicle.type,
        fuel: this.selectedVehicle.fuel,
        fuelEcon: this.selectedVehicle.fuelEcon,
        odometer: this.selectedVehicle.odometer
      })
      this.editMode = true;
    })
  }

  loadData() {
    this.vehiclesProxyService.getAllVehicles().subscribe(data => {
      console.log(data);
      this.vehicleSource = new MatTableDataSource(data);
    });
  }

  onRowClicked(row) {
    console.log(row);
    this.router.navigate(['/vehicles/', row.id]);
  }

  clearSelected() {
    this.router.navigate(['/vehicles/']);
  }

  onSubmit() {
    this.plateUsedError = false;
    if (!this.vehicleForm.valid) {
      this.snackBar.open('Kérlek tölts ki minden mezőt megfelelően', 'Bezár', { duration: 2000 });
    }

    let formVehicle = this.vehicleForm.value;
    let syncMagic = new Promise<void>((resolve) => {               //syncronisation black magic
      this.vehiclesProxyService.getVehicleByRegPlate(formVehicle.regPlate).subscribe(vehicle => {
        console.log(vehicle);
        if (vehicle != null) {
          this.plateUsedError = true;
        }
        resolve();
      })
    })
    syncMagic.then(() => {
      console.log(this.plateUsedError);
      if (!this.editMode && this.plateUsedError) {
        this.vehicleForm.controls['regPlate'].setErrors({ PlateInUse: true });
        this.vehicleForm.updateValueAndValidity();
        this.snackBar.open('A megadott rendszámú jármű már létezik a rendszerben', 'Bezár', { duration: 2000 });
        return;
      }

      if (this.selectedVehicle == null)
        this.selectedVehicle = new VehicleDTO(null, null, null, null, null);
      this.selectedVehicle.regPlate = formVehicle.regPlate.toUpperCase();
      this.selectedVehicle.type = formVehicle.type;
      this.selectedVehicle.fuel = formVehicle.fuel;
      this.selectedVehicle.fuelEcon = formVehicle.fuelEcon;
      this.selectedVehicle.odometer = formVehicle.odometer;

      console.log(this.selectedVehicle);
      let nestedSyncMagic = new Promise<void>((resolve) => {
        this.vehiclesProxyService.saveVehicle(this.selectedVehicle).subscribe(data => {
          console.log(data);
          resolve();
        });
      })

      nestedSyncMagic.then(() => {

        this.snackBar.open('Jármű sikeresen elmentve', 'Bezár', { duration: 2000 });
        if (!this.editMode)
          this.vehicleForm.reset();
        this.loadData();
      })
    })
  }



}
