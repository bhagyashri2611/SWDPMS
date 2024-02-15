import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  lstReportData: any[] = [];
  lstLoadingImages: any[] = [];
  lstUnLoadingImages: any[] = [];
  lstUnLoadingVideos: any[] = [];
  transData: any;
  constructor(private dbCallingService: DbCallingService,
    private router: Router, public dialogRef: MatDialogRef<ViewDetailsComponent>
  ) {
    debugger;
    this.dbCallingService.transactParams.subscribe(
      (result) => {

        this.transData=result;
        let obj = {
          UserId: null,
          LogSheetNo: this.transData.DC_No,
          WorkCode: null,
          ImageCategoryID: null,
          VehicleNo: this.transData.Vehicle_No,
        }
        this.dbCallingService.getSiteImagesData(obj).subscribe((res) => {
          if (res.ServiceResponse === 1) {
            this.lstLoadingImages = res.LoadingData;
            this.lstUnLoadingImages = res.UnloadingData;
            this.lstUnLoadingVideos = res.VidData;
          }
          else {
            Swal.fire({
              text: res.Msg,
              icon: 'warning'
            });
          }
        },
          (err) => {
            Swal.fire({
              text: err,
              icon: 'warning'
            });
          }
        );

      });
  }
  ngOnInit(): void {

  }
  Close(){
    this.dialogRef.close();
  }
}
