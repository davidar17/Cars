import { Vehicle } from './../_models/Vehicle';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Make } from 'src/_models/make';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature } from 'src/_models/feature';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  ApiUrl: string;


  constructor(private httpClient: HttpClient) {
    this.ApiUrl = environment.ApiUrl;
  }

  getMakes(): Observable<Make[]> {
    return this.httpClient.get<Make[]>(this.ApiUrl + 'api/makes');
  }

  getFeature(): Observable<Feature[]> {
    return this.httpClient.get<Feature[]>(this.ApiUrl + 'api/features');
  }
  createVehicle(vehicle: Vehicle) {
    return this.httpClient.post(this.ApiUrl + 'api/newvehicle', vehicle);
  }
  getVehicle(id: number): Observable<Vehicle> {
    return this.httpClient.get<Vehicle>(this.ApiUrl + 'api/vehicles/' + id);
  }
  updateVehicle(vehicle: Vehicle) {
    return this.httpClient.put(this.ApiUrl + 'api/update/' + vehicle.id, vehicle);
  }
  deleteVehicle(id) {
    return this.httpClient.delete(this.ApiUrl + 'api/delete/' + id);
  }
  getVehicles(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(this.ApiUrl + 'api/allvehicles/');
  }
}

