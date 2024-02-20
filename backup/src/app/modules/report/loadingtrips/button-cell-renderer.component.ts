import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'btn-cell-renderer',
  template: `
  <div></div>
  <button *ngIf="params.data.TripStatus===0"
                style="background-color: #3D9970;color:red;padding=0"
                class="btn btn-inverse-info btn-fw"
                > Pending
              </button>
              <button *ngIf="params.data.TripStatus>0"
                style="background-color: #3D9970;color: #fff;padding=0"
                class="btn btn-inverse-info btn-fw"
                > Completed
              </button>
              `,
})
export class BtnCellRenderer implements ICellRendererAngularComp {
  params: any;

  constructor(
    private router: Router,
  ) {}

  agInit(params: any): void {
    this.params = params;
    console.log(params.data.TripStatus)
  }

  inImageUrl = '../../../../VehicleImages/InVehicleImages/1.jpeg';

  btnClickedViewInVehicleImageHandler() {
    debugger;
    if (this.params.data.inImageURL != '') {
      const win = window.open();
      win.document.write(`<img src="${this.params.data.inImageURL}" alt="Image">`);
      debugger;
    } 
    else {
      
    }
  }

  refresh(): boolean {
    return false;
  }
}
