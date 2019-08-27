
import { HttpClientService } from './../_services/httpClient.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { NewCarComponent } from './newCar/newCar.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'newcar', component: NewCarComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NewCarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    HttpClientService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
