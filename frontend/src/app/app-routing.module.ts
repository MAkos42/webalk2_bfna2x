import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehiclesComponent } from './vehicles/vehicles.component';
import { DriversComponent } from './drivers/drivers.component';
import { TripsComponent } from './trips/trips.component';
import { ReportComponent } from './report/report.component';

const routes: Routes = [
  { path: "vehicles", component: VehiclesComponent },
  { path: "vehicles/:id", component: VehiclesComponent },
  { path: "drivers", component: DriversComponent },
  { path: "drivers/:id", component: DriversComponent },
  { path: "trips", component: TripsComponent },
  { path: "report", component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
