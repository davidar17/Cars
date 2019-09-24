import { Model } from './../../_models/model';
import { QueryObj } from '../../_models/QueryObj';
import { Vehicle, QueryResult } from './../../_models/Vehicle';
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
  queryResult: QueryResult = {
    totalItems: 0,
    items: []
  };

  makes: Make[];
  modles: Model[];
  queryObj: any = {
    IsSortAscending: true,
    page: 1,
    pagesize: 3
  };
  columns = [
    { title: 'Id', sortValue: 'id', sorteble: true },
    { title: 'Make', sortValue: 'make', sorteble: true },
    { title: 'Contact Name', sortValue: 'contactName', sorteble: true },
    { title: 'Model Name', sortValue: 'model', sorteble: true },
    { title: 'Registered', sortValue: 'isRegistered', sorteble: false },
  ];
  constructor(private httpClient: HttpClientService) { }

  ngOnInit() {
    forkJoin([this.httpClient.getVehicles(this.queryObj),
    this.httpClient.getMakes()]).subscribe(data => {
      this.queryResult.items = data[0].items;
      this.queryResult.totalItems = data[0].totalItems;
      this.makes = data[1];
    });
  }

  selectMake(id) {
    const item = this.makes.find(x => x.id === +id);
    return item.name;
  }

  onFilterChange() {
    this.queryObj.page = 1;
    this.getVehicle();
  }
  getVehicle() {
    this.httpClient.getVehicles(this.queryObj).subscribe(res => {
      this.queryResult.items = res.items;
      this.queryResult.totalItems = res.totalItems;
    });
  }
  pageChanged(event) {

    this.queryObj.page = event.page;
    this.getVehicle();
  }
  sortBy(columnName, sorteble) {
    if (!sorteble) {
      return;
    }
    console.log(columnName);
    if (this.queryObj.sortBy === columnName) {
      this.queryObj.IsSortAscending = !this.queryObj.IsSortAscending;
    } else {
      this.queryObj.sortBy = columnName;
      this.queryObj.IsSortAscending = true;
    }
    this.getVehicle();
  }
  getModelName(makeId, modelId) {
    return this.makes.find(x => x.id === makeId).models.find(x => x.id === modelId).name;
  }
}
