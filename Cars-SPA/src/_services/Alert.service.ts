import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) {}

  showSuccess(msn) {
    this.toastr.success(msn);
  }
  showError(msn) {
    this.toastr.error(msn);
  }
  showWarning(msn) {
    this.toastr.warning(msn);
  }
}
