import { Vehicle } from './../../_models/Vehicle';
import { Make } from './../../_models/make';
import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/_services/httpClient.service';
import { forkJoin } from 'rxjs';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-list-car',
  templateUrl: './listCar.component.html',
  styleUrls: ['./listCar.component.css']
})
export class ListCarComponent implements OnInit {
  vehicles: Vehicle[];
  allVehicles: Vehicle[];
  makes: Make[];
  makeId: number;
  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
    forkJoin([this.httpClient.getVehicles(),
    this.httpClient.getMakes()]).subscribe(data => {
      this.vehicles = data[0];
      this.allVehicles = data[0];
      this.makes = data[1];
    });
  }

  selectMake(id) {
    const item = this.makes.find(x => x.id === +id);
    return item.name;
  }

  onFilterChange() {
    const vehicles = this.allVehicles.filter(x => x.makeId === this.makeId);
    this.vehicles = vehicles;
  }
}
