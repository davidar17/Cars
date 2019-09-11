import { AppErrorHandler } from './../_services/app.error-handler.ts';

import { HttpClientService } from './../_services/httpClient.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { UpdateCarComponent } from './updateCar/updateCar.component';
import { AppComponent } from './app.component';
import { NewCarComponent } from './newCar/newCar.component';
import { ListCarComponent } from './listCar/listCar.component';

const appRoutes: Routes = [
   { path: 'newcar', component: NewCarComponent },
   { path: 'vehicles', component: ListCarComponent },
   { path: 'vehicles/:id', component: UpdateCarComponent },
   { path: '**', redirectTo: 'vehicles', pathMatch: 'full' },
];

@NgModule({
   declarations: [
      AppComponent,
      NewCarComponent,
      UpdateCarComponent,
      ListCarComponent
   ],
   imports: [
      FormsModule,
      BrowserModule,
      HttpClientModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      ToastrModule.forRoot() // ToastrModule added
   ],
   providers: [
      HttpClientService,
      { provide: ErrorHandler, useClass: AppErrorHandler }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
