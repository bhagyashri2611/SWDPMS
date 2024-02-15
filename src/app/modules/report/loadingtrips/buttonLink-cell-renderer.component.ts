import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'btnlink-cell-renderer',
  template: `
    <button
      style="background-color: #3D9970;color: #fff;padding=0"
      class="btn btn-inverse-info btn-fw"
      (click)="btnClickedViewOutVehicleImageHandler()"
    >
      View Image
    </button>
  `,
})
export class BtnLinkCellRenderer implements ICellRendererAngularComp {
  params: any;

  constructor(private router: Router) {}

  agInit(params: any): void {
    this.params = params;
  }

  outImageURL = '../../../../VehicleImages/InVehicleImages/1.jpeg';

  btnClickedViewOutVehicleImageHandler() {
    debugger;
    if (this.params.data.outImageURL != '') {
      const win = window.open();
      win.document.write( 
        `<img src="${this.params.data.outImageURL}" alt="Image">`
      );
      debugger;
    } else {
    }
  }

  refresh(): boolean {
    return false;
  }
}
