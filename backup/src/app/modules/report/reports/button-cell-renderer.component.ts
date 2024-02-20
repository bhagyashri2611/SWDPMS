import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'btn-cell-renderer',
  template: ` 
              <button cButton color="info" size="sm" (click)="btnClickedViewInVehicleImageHandler()">View Image </button>
              `,
})
export class BtnCellRenderer implements ICellRendererAngularComp {
  params: any;

  constructor(
    private router: Router,
  ) {}

  agInit(params: any): void {
    this.params = params;
  }
 
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
