import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-site-vehicle-image',
  templateUrl: './view-site-vehicle-image.component.html',
  styleUrls: ['./view-site-vehicle-image.component.scss']
})
export class ViewSiteVehicleImageComponent implements OnInit {
  lstReportData: any[] = [];
  lstLoadingImages: any[] = [];
  lstUnLoadingImages: any[] = [];
  lstUnLoadingVideos: any[] = [];
  Form: FormGroup;
  constructor(private fb: FormBuilder, private dbCallingService: DbCallingService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.Form = this.fb.group({
      logsheet: ["", Validators.required],

    });

  }

  onSubmit() {
    let obj = {
      UserId: Number(sessionStorage.getItem("UserId")),
      LogSheetNo: this.Form.value.logsheet,
      WorkCode: null,
      ImageCategoryID: null,
      VehicleNo: null,
    }

    if(this.Form.value.logsheet){
      this.dbCallingService.getSiteImagesData(obj).subscribe((res) => {
        console.log(res)
        if (res.ServiceResponse === 1) {       
            this.lstLoadingImages = res.LoadingData;
            this.lstUnLoadingImages = res.UnloadingData;
            this.lstUnLoadingVideos = res.VidData;
          // }
          // else {
          //   Swal.fire({
          //     text: 'No Record Found !',
          //     icon: 'warning'
          //   });
          // }
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

    }else{
      Swal.fire({
        text: "Enter Logsheet No",
        icon: 'warning'
      });
    }
    

  }
  back() {
    this.router.navigateByUrl('/dashboard');
  }
}
