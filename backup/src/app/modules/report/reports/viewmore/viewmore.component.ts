import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-viewmore',
  templateUrl: './viewmore.component.html',
  styleUrls: ['./viewmore.component.scss']
})
export class ViewmoreComponent implements OnInit {
  lstReportData: any[] = [];
  lstLoadingImages: any[] = [];
  lstUnLoadingImages: any[] = [];
  lstUnLoadingVideos: any[] = [];
  constructor(private dbCallingService: DbCallingService,
    private router: Router, public dialogRef: MatDialogRef<ViewmoreComponent>
  ) {
    debugger;
    this.dbCallingService.transactParams.subscribe(
      (result) => {
        this.dbCallingService.getSiteImagesData(result).subscribe((res) => {
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
