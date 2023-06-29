import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverDTO } from '../DTO/DriverDTO';

@Injectable({
  providedIn: 'root'
})

export class DriversProxyService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAllDrivers(): Observable<DriverDTO[]> {
    const url = `${this.apiUrl}/drivers`;
    return this.http.get<DriverDTO[]>(url);
  }

  getDriver(id: number): Observable<DriverDTO> {
    const url = `${this.apiUrl}/getdriver`;
    return this.http.post<DriverDTO>(url, { id });
  }

  getDriverByLicense(driversLicense: string): Observable<DriverDTO> {
    const url = `${this.apiUrl}/getdriverbylicense`;
    console.log(driversLicense);
    return this.http.post<DriverDTO>(url, { driversLicense });
  }

  saveVehicle(driver: DriverDTO): Observable<DriverDTO> {
    const url = `${this.apiUrl}/savedriver`;
    return this.http.post<DriverDTO>(url, driver);
  }
}
