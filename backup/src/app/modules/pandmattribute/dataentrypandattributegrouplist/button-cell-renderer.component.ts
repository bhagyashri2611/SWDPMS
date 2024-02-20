
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'btn-cell-renderer',
    template: `     
      <button class="btn btn-inverse-info btn-fw" (click)="btnClickedEditHandler()">Edit</button>
    `,
})
export class BtnCellRenderer implements ICellRendererAngularComp {
    private params: any;
constructor(private router:Router){}
    agInit(params: any): void {
        this.params = params;
    }

    btnClickedEditHandler() {
      this.router.navigate(['location/dataentrypandmgroup/'+this.params.data._id]);
       
    }
    btnClickedAttachModuleHandler() {
      // console.log(this.params)
      this.router.navigate(['location/attachmodule']);
      // this.params.context.componentParent.methodFromParent(
      //     { id: this.params.data._id, name:this.params.data.locationName}
      //   );
     
  }
    refresh(): boolean {
        return false;
      }
}