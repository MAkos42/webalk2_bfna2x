import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiclesProxyService } from '../services/vehicles-proxy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleDTO } from '../DTO/VehicleDTO';
import { TripsProxyService } from '../services/trips-proxy.service';
import { ReportRequest } from '../DTO/ReportRequest';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportCreated: boolean = false;
  vehiclesList: VehicleDTO[];

  reportForm = new FormGroup({
    vehicle: new FormControl<number>(null, [Validators.required]),
    startDate: new FormControl<Date>(null, [Validators.required]),
    endDate: new FormControl<Date>(null, [Validators.required])
  });

  returnForm = new FormGroup({
    distance: new FormControl(null, {}),
    fuelConsumption: new FormControl(null),
    flatRate: new FormControl(null),
    sum: new FormControl(null),
  })


  constructor(private vehiclesProxyService: VehiclesProxyService, private tripsProxyService: TripsProxyService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.vehiclesProxyService.getAllVehicles().subscribe(vehicles => {
      console.log(vehicles);
      this.vehiclesList = vehicles;
    });
  }

  displayVehicle(id: number): string {
    if (id === null) {
      return null;
    }
    let vehicle: VehicleDTO = this.vehiclesList.find(x => x.id === id);
    return vehicle.regPlate + ' | ' + vehicle.type;
  }

  onSubmit() {
    if (!this.reportForm.valid) {
      this.snackBar.open('Kérlek tölts ki minden mezőt megfelelően', 'Bezár', { duration: 2000 });
      return;
    }
    let requestForm = this.reportForm.value;

    let request: ReportRequest = new ReportRequest(requestForm.vehicle, requestForm.startDate, requestForm.endDate);

    this.tripsProxyService.getReport(request).subscribe(response => {
      this.returnForm.setValue({
        distance: response.distance + ' km',
        fuelConsumption: response.fuelConsumption + ' Ft',
        flatRate: response.flatRate + ' Ft',
        sum: response.sum + ' Ft'
      });
      console.log(this.returnForm.value);
    })

    this.reportCreated = true;

  }
}
