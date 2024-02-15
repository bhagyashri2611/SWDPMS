import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewmoreComponent } from '../reports/viewmore/viewmore.component';

@Component({
  selector: 'btnmore-cell-renderer',
  template: `
    <button
      style="background-color: #3D9970;color: #fff;padding=0"
      class="btn btn-inverse-info btn-fw"
      (click)="btnClickedViewMoreHandler()">
      View More
    </button>
  `,
})
export class BtnMoreCellRenderer implements ICellRendererAngularComp {
   params: any;
  constructor( private dbCallingService: DbCallingService,
    private router: Router, public matDialog: MatDialog
  ) {
  }

  agInit(params: any): void {
    this.params = params;
    this.params.SlipSrNo = Number(params.SlipSrNo);
  }

  btnClickedViewMoreHandler() {
    debugger;
    if (this.params.data.SlipSrNo != '') {
      let obj = {
        UserId: null,
        LogSheetNo: this.params.data.LogSheetNo,
        WorkCode: this.params.data.WorkCode,
        ImageCategoryID: null,
        VehicleNo: this.params.data.VehicleNo,
      }
      this.dbCallingService.getTransactSearchParams(obj);         
      const dialogConfig = new MatDialogConfig();     
      dialogConfig.disableClose = false;
      dialogConfig.id = "modalStatic"; 
      dialogConfig.height = "700px";
      dialogConfig.width = "900px";
      const modalDialog = this.matDialog.open(ViewmoreComponent, dialogConfig);  
            
     // this.router.navigate(["/reports/viewmore"],);   
     // window.open('/reports/viewmore') 
    }     
    else {
    }
  }

  refresh(): boolean {
    return false;
  }
}
