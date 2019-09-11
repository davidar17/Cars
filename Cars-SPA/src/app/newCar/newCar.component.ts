import { AlertService } from './../../_services/Alert.service';
import { Contact } from './../../_models/contact';
import { Vehicle } from './../../_models/Vehicle';
import { Feature } from 'src/_models/feature';
import { Model } from './../../_models/model';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Make } from 'src/_models/make';
import { HttpClientService } from 'src/_services/httpClient.service';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

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
  contactName: string;
  contactPhone: number;
  contactEmail: string;
  registered = true;
  featureName: string;
  vehicle: Vehicle;
  // @VewChild('makeSelectElement', { static: false }) selectMake: ElementRef;

  ngOnInit() {
    this.vehicle = new Vehicle();
  }

  constructor(private httpClient: HttpClientService, private renderer: Renderer2, private alert: AlertService) {
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
    alert(data.value.registered + '\n' +
      data.value.featureName + '\n' + data.value.contactName);
  }

  peekModels(data: Model[]) {
    this.models = data;
   // delete this.model;
  }

  featureHandle(feature: Feature, event) {
    if (event.target.checked) {
      const tmpFeature = this.vehicle.features.find(id => id === feature.id);
      if (!tmpFeature) {
        this.vehicle.features.push(feature.id);
      } else {
        const index = this.vehicle.features.find(id => id === feature.id);
        this.vehicle.features.splice(index, 1);
      }
    }
  }

  focusOnElement(element) {
    this.renderer.selectRootElement(element).focus();
  }

  createVehicle(makeForm) {

    const contact = new Contact();
    contact.email = makeForm.value.contactEmail;
    contact.name = makeForm.value.contactName;
    contact.phone = makeForm.value.contactPhone;
    this.vehicle.contact = contact;
    this.vehicle.modelId = this.model.id;
    this.vehicle.isRegistered = this.registered;
    this.httpClient.createVehicle(this.vehicle).
      subscribe((rest) => {
        makeForm.reset();
        this.alert.showSuccess(rest);
      }, error => {
        this.alert.showError(error.error);
      });
  }


  setVehicleId() {
    alert(JSON.stringify(this.model));
  }
}
