import { AlertService } from './../../_services/Alert.service';
import { Feature } from './../../_models/feature';
import { Model } from './../../_models/model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/_services/httpClient.service';
import { Make } from 'src/_models/make';
import { Vehicle } from 'src/_models/Vehicle';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Contact } from 'src/_models/contact';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-update-car',
  templateUrl: './updateCar.component.html',
  styleUrls: ['./updateCar.component.css']
})
export class UpdateCarComponent implements OnInit {
  vehicle: Vehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: '',
      phone: '',
      email: ''
    }
  };
  models: Model[] = [];
  makes: Make[] = [];
  features: Feature[] = [];

  constructor(private httpClient: HttpClientService, private alert: AlertService,
    // tslint:disable-next-line:align
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => this.vehicle.id = +param.get('id'));
    forkJoin([
      this.httpClient.getVehicle(this.vehicle.id),
      this.httpClient.getMakes(),
      this.httpClient.getFeature()
    ]).subscribe(data => {
      this.vehicle = data[0];
      this.makes = data[1];
      this.models = this.makes.find(x => x.id === this.vehicle.makeId).models;
      this.features = data[2];
    }, error => this.alert.showError(error.error));
  }
  selectModel() {


    this.models = this.makes.find(x => x.id === this.vehicle.makeId).models;
    this.vehicle.modelId = this.models[0].id;
  }
  setVehicleId() {

    console.log('Vehicle was selcted');
  }

  selectFeature(id, event) {
    console.log(id);
    if (event.target.checked) {
      if (!this.vehicle.features.includes(id)) {
        this.vehicle.features.push(id);
      }
    } else {
      if (this.vehicle.features.includes(id)) {
        const index = this.vehicle.features.findIndex(x => x === id);
        this.vehicle.features.splice(index, 1);
      }
    }
  }

  updateVehicle() {
    this.httpClient.updateVehicle(this.vehicle).
      subscribe(null, null, () => {this.alert.showSuccess('Update Success');
    });
  }

  deleteVehicle() {
    this.httpClient.deleteVehicle(this.vehicle.id).
      subscribe(null, null, () => {
        this.alert.showSuccess('Delete Success');
        this.router.navigate(['/vehicles']);
      });
  }
}
