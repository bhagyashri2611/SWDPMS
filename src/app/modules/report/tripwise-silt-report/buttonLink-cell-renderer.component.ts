import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'btnlink-cell-renderer',
  template: `
    <button
    cButton color="info" size="sm" style="background-color: #39f;border-radius: 4px;border: none;"
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
