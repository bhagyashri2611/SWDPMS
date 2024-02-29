import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button
      class="me-1"
      color="success"
      cButton
      (click)="btnClickedAddModuleDetailHandler()"
    >
      <svg cIcon name="cilMagnifyingGlass"></svg>
      Enter Data
    </button>
    <button
      class="me-1"
      color="light"
      cButton
      (click)="btnClickedEditHandler()"
      *ngIf="userRole === 'Data Owner'"
    >
      <svg cIcon name="cilNoteAdd"></svg>
      Edit
    </button>
    <button
      class="me-1"
      color="light"
      cButton
      (click)="btnClickedAttachModuleHandler()"
      *ngIf="userRole === 'Data Owner'"
    >
      <svg cIcon name="cilLink"></svg>
      Attach Task
    </button>
  `,
})
export class BtnCellRenderer implements ICellRendererAngularComp {
  private params: any;
  userRole = sessionStorage.getItem("UserRole")
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
