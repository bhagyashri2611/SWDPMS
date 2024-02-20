import { Component } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'checkbox-cell-renderer',
  template: `
    <input
      type="checkbox"
      [checked]="params.data[params.colDef.field] === 'True' ? 'checked' : ''"
      (click)="checkedHandler($event)"
    />
  `,
})
export class CheckBoxCellRenderer implements ICellRendererAngularComp {
  params: any;

  constructor(
    private router: Router,
    private dbCallingService: DbCallingService
  ) {}

  agInit(params: any): void {
    this.params = params;
    console.log(params.data[params.colDef.field]);
  }
  refresh(): boolean {
    return false;
  }

  checkedHandler(event) {
    // console.log(event);
    const checked = event.currentTarget.checked;
    console.log(checked);
    this.params.data[this.params.colDef.field] =
      checked === true ? true : false;
    event.stopPropagation();

    //this.params.data[this.params.colDef.field] = event.currentTarget.checked;
    //event.stopPropagation(); // Prevents the grid from receiving the click event
    // Access the row data and perform necessary actions
    const rowData = this.params.node.data;
    // Perform your desired actions here based on the checkbox click event
    // console.log('Ch eckbox clicked!', rowData);
    let StatusMode;
    if (this.params.colDef.field == 'VerifiedStatus') {
      StatusMode = 'Verify';
    }
    if (this.params.colDef.field == 'AuthorizedStatus') {
      StatusMode = 'Authorize';
    }
    // console.log(this.params.colDef.field);
    // console.log(event.currentTarget.checked);
    let obj = {
      UserID: Number(sessionStorage.getItem('UserId')),
      SrNo: rowData.SlipSrNo,
      Status: event.currentTarget.checked,
      StatusMode: StatusMode,
      WeighBrigde: rowData.Weighbridge,
    };
    //console.log(obj);
    this.dbCallingService.verifyupdateStatus(obj).subscribe((res) => {
      console.log(res);
      if (res.Msg) {
        Swal.fire({
          text: res.Msg,
          icon: 'success',
        });
      } else {
        Swal.fire({
          text: res.Msg,
          icon: 'warning',
        });
      }
    });
  }
}
