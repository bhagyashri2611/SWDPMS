import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button
      class="me-1"
      color="secondary"
      cButton
      (click)="btnClickedEditHandler()"
    >
      <svg cIcon name="cilNoteAdd" style="margin-right: 5px;"></svg>
      Edit
    </button>
  `,
})
export class BtnCellRenderer implements ICellRendererAngularComp {
  private params: any;
  constructor(private router: Router) {}
  agInit(params: any): void {
    this.params = params;
    console.log(this.params);
  }

  btnClickedEditHandler() {
    console.log('Clicked');
    this.router.navigate(['/unit/create/' + this.params.data._id]);
  }

  refresh(): boolean {
    return false;
  }
}
