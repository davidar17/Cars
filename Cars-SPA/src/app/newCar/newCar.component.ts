import { Feature } from 'src/_models/feature';
import { Model } from './../../_models/model';
import { Component, OnInit } from '@angular/core';
import { Make } from 'src/_models/make';
import { HttpClientService } from 'src/_services/httpClient.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './newCar.component.html',
  styleUrls: ['./newCar.component.css']
})
export class NewCarComponent implements OnInit {
  makes: Make[];
  models: Model[];
  make: Make;
  model: Model;
  features: Feature[];

  ngOnInit() {
  }

  constructor(private httpClient: HttpClientService) {
    this.getMakes();
  }

  getMakes() {
    this.httpClient.getMakes().subscribe(response => {
      this.makes = response;
    });
    this.httpClient.getFeature().subscribe(response => {
      this.features = response;
    });
  }

  submit() {
    alert('The make name is:' + this.make.name);
  }

  makeSelected(data) {
    alert('The option select is:' + data.value.make.name + ' and model ' + data.value.model.name);
  }

  peekModels(data: Model[]) {
    this.models = data;
  }
}
