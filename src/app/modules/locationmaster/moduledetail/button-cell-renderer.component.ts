
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'btn-cell-renderer',
    template: `    
      <!-- <button class="btn btn-inverse-info btn-fw" (click)="btnClickedEditHandler()">Edit</button> -->
      <button
      class="me-1"
      color="success"
      cButton
      (click)="btnClickedEditHandler()"
    >
      <svg cIcon name="cilSave"></svg>
      Save
    </button>
    `,
})
export class BtnCellRenderer implements ICellRendererAngularComp {
    private params: any;
constructor(private router:Router){}
    agInit(params: any): void {
        this.params = params;
    }

    btnClickedAddModuleDetailHandler() {
      this.router.navigate(['location/addmoduledetails/'+this.params.data._id]);
       
    }
    btnClickedEditHandler() {
      this.router.navigate(['location/edit/'+this.params.data._id]);
       
    }
    btnClickedAttachModuleHandler() {
      // console.log(this.params)
      this.router.navigate(['location/attachmodule/'+this.params.data._id]);
      // this.params.context.componentParent.methodFromParent(
      //     { id: this.params.data._id, name:this.params.data.locationName}
      //   );
     
  }
    refresh(): boolean {
        return false;
      }
}