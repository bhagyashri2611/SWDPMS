import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <!-- <button
      class="btn btn-inverse-info btn-fw mr-2"
      (click)="btnClickedAttachModuleHandler()"
    >
      Attach Item
    </button> -->
    <button
      class="me-1"
      color="light"
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
  }

  btnClickedEditHandler() {
    this.router.navigate(['module/create/' + this.params.data._id]);
  }
  btnClickedAttachModuleHandler() {
    // console.log(this.params)
    this.router.navigate(['module/attachasset/' + this.params.data._id]);
    // this.params.context.componentParent.methodFromParent(
    //     { id: this.params.data._id, name:this.params.data.locationName}
    //   );
  }
  refresh(): boolean {
    return false;
  }
}
