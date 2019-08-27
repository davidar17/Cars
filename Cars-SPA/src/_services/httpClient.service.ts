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
}

