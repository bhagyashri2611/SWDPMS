import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewDetailsComponent } from './view-details/view-details.component';
@Component({
  selector: 'btnview-cell-renderer',
  template: ` <button cButton color="info" size="sm" (click)="btnClickedViewDetailsHandler()"> View Details </button> `,
})
export class BtnViewCellRenderer implements ICellRendererAngularComp {
  params: any;

  constructor( private dbCallingService: DbCallingService,
    private router: Router, public matDialog: MatDialog
  ) {
  }

  agInit(params: any): void {
    this.params = params;
    this.params.SlipSrNo = Number(params.SlipSrNo);
  }

  btnClickedViewDetailsHandler() {

    debugger;
    if (this.params.data.SlipSrNo != '') {
      let obj = {
        UserId: null,
        LogSheetNo: this.params.data.DC_No,
        WorkCode: null,
        ImageCategoryID: null,
        VehicleNo: this.params.data.Vehicle_No,
      }
      this.dbCallingService.getTransactSearchParams(this.params.data);    
      const dialogConfig = new MatDialogConfig();     
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "700px";
      dialogConfig.width = "900px";
      const modalDialog = this.matDialog.open(ViewDetailsComponent, dialogConfig);  
    
    }     
    else {
    }
  }

  refresh(): boolean {
    return false;
  }
}
