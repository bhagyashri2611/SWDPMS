import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { LocationService } from '../../../core/services/location.service';
import { ReportService } from 'src/app/core/services/report.service';
import Swal from 'sweetalert2';
import { DataentryService } from 'src/app/core/services/dataentry.service';
import { DataEntryModel } from 'src/app/core/models/IDataEntry';

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
export class BtnConSaveCellRenderer implements ICellRendererAngularComp {
  private params: any;
  objDataEntryModel: DataEntryModel;
  constructor(
    private router: Router,
    private locationService: LocationService,
    private reportService: ReportService,
    private dataEntryService: DataentryService
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

  userName = sessionStorage.getItem('FullName');
  btnClickedSaveHandler() {
    console.log(this.params.data);
    debugger;

    this.objDataEntryModel = {
      location: this.params.data.location._id,
      module: this.params.data.module._id,
      assetInstance: null,
      dataDate: this.params.data.dataDate,
      attributeValues: [this.params.data.attributeValues],
      locationName: null,
      moduleName: null,
      assetnstanceName: null,
      ward: null,
      zone: null,
      workCode: null,
      contractorName: null,
      roadStatus: null,
      assignedSE: null,
      createdBy: null,
      createdOn: null,
      modifiedBy: null,
      modifiedOn: null,
      modifiedByContractor: this.userName,
    };
    debugger;
    console.log(this.objDataEntryModel);

    // this.dataEntryService.saveConData(this.objDataEntryModel).subscribe((result) => {
    //     debugger;
    //   });

    Swal.fire({
      title: '',
      text: 'Do you want to save the changes?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        debugger;
        this.dataEntryService
          .saveConData(this.objDataEntryModel)
          .subscribe((result) => {
            debugger;
            if (result != null) {
              if (result.status === 201) {
                debugger;
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  text: 'Saved Successfully',
                  showConfirmButton: true,
                  timer: 1500,
                }).then(()=>{
                  window.location.reload();
                });  
              }
            } else {
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
          });
      } else {
        debugger;
        this.params.data.attributeValues.contractorremark = '';
        this.params.api.refreshCells({
          rowNodes: [this.params.node],
          force: true,
        });
      }
    });
  }
  logOut() {
    this.router.navigate(['/login/']);
    sessionStorage.clear();
    window.location.reload();
  }

  refresh(): boolean {
    return false;
  }
}
