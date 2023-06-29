import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TripDTO } from '../DTO/TripDTO';
import { Observable } from 'rxjs';
import { ReportDTO } from '../DTO/ReportDTO';
import { ReportRequest } from '../DTO/ReportRequest';

@Injectable({
  providedIn: 'root'
})
export class TripsProxyService {
  getAllTrips(): Observable<TripDTO[]> {
    const url = `${this.apiUrl}/trips`;
    return this.http.get<TripDTO[]>(url);
  }

  getReport(reportRequest: ReportRequest): Observable<ReportDTO> {
    const url = `${this.apiUrl}/report`;
    return this.http.post<ReportDTO>(url, reportRequest);

  }

  saveTrip(newTrip: TripDTO): Observable<TripDTO> {
    const url = `${this.apiUrl}/savetrip`;
    return this.http.post<TripDTO>(url, newTrip);
  }
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }



}
