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
      (click)="btnClickedAttachModuleHandler()"
    >
      <svg cIcon name="cilLink"></svg>
      Attach Task
    </button>
    <button
      class="me-1"
      color="light"
      cButton
      (click)="btnClickedAddModuleDetailHandler()"
    >
      <svg cIcon name="cilPlus"></svg>
      Task Details
    </button>
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
  constructor(private router: Router) {}
  agInit(params: any): void {
    this.params = params;
  }

  btnClickedAddModuleDetailHandler() {
    this.router.navigate(['location/addmoduledetails/' + this.params.data._id]);
  }
  btnClickedEditHandler() {
    console.log(this.params.data._id);
    this.router.navigate(['location/create/' + this.params.data._id]);
  }
  btnClickedAttachModuleHandler() {
    this.router.navigate(['location/attachmodule/' + this.params.data._id]);
  }
  refresh(): boolean {
    return false;
  }
}
