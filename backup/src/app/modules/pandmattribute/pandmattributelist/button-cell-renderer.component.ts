
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'btn-cell-renderer',
  template: `     
      <button
      class="me-1"
      color="light"
      cButton
      (click)="btnClickedEditHandler()"
    >
      <svg cIcon name="cilNoteAdd"></svg>
      Edit
    </button>
    `,
})
export class BtnCellRenderer implements ICellRendererAngularComp {
  private params: any;
  constructor(private router: Router) { }
  agInit(params: any): void {
    this.params = params;
  }

  btnClickedEditHandler() {
debugger;
    this.router.navigate(['location/createdataentrypandm/' + this.params.data._id]);

  }
  
  refresh(): boolean {
    return false;
  }
}