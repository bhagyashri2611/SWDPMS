import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { LocationService } from '../../../core/services/location.service';
import { ReportService } from 'src/app/core/services/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'btn-save-cell-renderer',
  template: `
    <button
      class="me-1"
      color="success"
      cButton
      (click)="btnClickedSaveHandler()"
    >
      <svg cIcon name="cilSave"></svg>
      Save
    </button>
  `,
})
export class BtnSaveCellRenderer implements ICellRendererAngularComp {
  private params: any;
  constructor(
    private router: Router,
    private locationService: LocationService,
    private reportService: ReportService
  ) {}
  agInit(params: any): void {
    this.params = params;
  }

  values: [
    { _id: 1; unitName: 'Cum' },
    { _id: 2; unitName: 'Sqm' },
    { _id: 3; unitName: 'MT' },
    { _id: 4; unitName: 'Rmt' },
    { _id: 5; unitName: 'Nos' },
    { _id: 6; unitName: 'meter' }
  ];

  btnClickedSaveHandler() {
    let quantity = Number(
      this.params.data.quantityQuarter1 +
        this.params.data.quantityQuarter2 +
        this.params.data.quantityQuarter3 +
        this.params.data.quantityQuarter4 +
        this.params.data.quantityQuarter5
    );
    let qPerDay: any = Number(
      quantity /
        this.reportService.getDatesBetweenDates(
          new Date(this.params.data.location.startDate),
          new Date(this.params.data.location.endDate)
        ).length
    ).toFixed(2);
    let tillDays = this.reportService.getDatesBetweenDates(
      new Date(this.params.data.location.startDate),
      new Date() < new Date(this.params.data.location.endDate)
        ? new Date()
        : new Date(this.params.data.location.endDate)
    ).length;
    let pQuantity = (qPerDay * tillDays).toFixed(2);
    debugger;

    const modID = this.params.data._id;
    debugger;
    const data = {
      module: this.params.data._id,
      quantity: this.params.data.quantity,
      quantityQuarter1: this.params.data.quantityQuarter1,
      quantityQuarter2: this.params.data.quantityQuarter2,
      quantityQuarter3: this.params.data.quantityQuarter3,
      quantityQuarter4: this.params.data.quantityQuarter4,
      quantityQuarter5: this.params.data.quantityQuarter5,
      rateofwork: this.params.data.rateofwork,
      units: null,
      totalCost:
        (this.params.data.rateofwork === '' ? 1 : this.params.data.rateofwork) *
        this.params.data.quantity,
      quantityPerDay: qPerDay,
      plannedQuantity: pQuantity,
      modifiedBy:sessionStorage.getItem('FullName')
    };


    
    Swal.fire({
      title: '',
      text:'Do you want to save the changes?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        this.locationService.addModuleDetails(modID, data).subscribe((result) => {
          if(result != null){
            if (result.status === 201) {
              debugger;
              Swal.fire({
                text: 'Updated',
                icon: 'success',
              }).then(()=>{
                window.location.reload();
              });              
            }
          }
          else {
            Swal.fire({
              title: 'Seesion Expired',
              text: 'Login Again to Continue',
              icon: 'warning',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.value) {
                debugger;
                this.logOut();
              }
            });
          }
           
          },
          (err) => {
            //  this.notificationService.warn(':: ' + err);
          }
        );
          } 
    })
  }

  logOut(){
    this.router.navigate(["/login/"]);
    sessionStorage.clear();
    window.location.reload();
  }
  refresh(): boolean {
    return false;
  }
}
