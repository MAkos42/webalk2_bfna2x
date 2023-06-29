import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleDTO } from '../DTO/VehicleDTO';

@Injectable({
  providedIn: 'root'
})
export class VehiclesProxyService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllVehicles(): Observable<VehicleDTO[]> {
    const url = `${this.apiUrl}/vehicles`;
    return this.http.get<VehicleDTO[]>(url);
  }

  getVehicle(id: number): Observable<VehicleDTO> {
    const url = `${this.apiUrl}/getvehicle`;
    return this.http.post<VehicleDTO>(url, { id });
  }

  getVehicleByRegPlate(regPlate: string): Observable<VehicleDTO> {
    const url = `${this.apiUrl}/getvehiclebyreg`;
    return this.http.post<VehicleDTO>(url, { regPlate });
  }

  saveVehicle(vehicle: VehicleDTO): Observable<VehicleDTO> {
    const url = `${this.apiUrl}/savevehicle`;
    return this.http.post<VehicleDTO>(url, vehicle);
  }
}
