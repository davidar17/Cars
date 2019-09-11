import { inject } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandler, Injectable } from '@angular/core';


export class AppErrorHandler implements ErrorHandler {
    constructor( private toastr: ToastrService) { }
    handleError(error: any): void {
        this.toastr.error(error, 'Error');
    }
}
