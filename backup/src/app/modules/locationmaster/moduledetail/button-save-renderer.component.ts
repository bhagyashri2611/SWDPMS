import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { LocationService } from '../../../core/services/location.service';

@Component({
  selector: 'btn-save-cell-renderer',
  template: `
   
    <button
      class="btn btn-inverse-success btn-fw" style="background-color: lightgreen"
      (click)="btnClickedSaveHandler()"
    >
      Save
    </button>
  `,
})
export class BtnSaveCellRenderer implements ICellRendererAngularComp {
  private params: any;
  constructor(
    private router: Router,
    private locationService: LocationService
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
    debugger;
    const modID = this.params.data._id;

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
      cumulativeQuantity: null,
    };

    this.locationService.addModuleDetails(modID, data).subscribe(
      (result) => {
        if (result.status === 201) {
          debugger;
          alert('Values Updated !');
          window.location.reload();
        }
      },
      (err) => {
        //  this.notificationService.warn(':: ' + err);
      }
    );

    // this.router.navigate(['location/edit/' + this.params.data._id]);
  }

  refresh(): boolean {
    return false;
  }
}
