import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewmoreComponent } from './viewmore/viewmore.component';
@Component({
  selector: 'btnmore-cell-renderer',
  template: ` <button cButton color="info" size="sm" (click)="btnClickedViewMoreHandler()">View More </button> `,
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
        LogSheetNo: this.params.data.DC_No,
        WorkCode: null,
        ImageCategoryID: null,
        VehicleNo: this.params.data.Vehicle_No,
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
