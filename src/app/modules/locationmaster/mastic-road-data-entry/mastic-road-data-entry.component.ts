import { Component } from '@angular/core';

import Swal from 'sweetalert2';


import * as XLSX from 'xlsx';
type AOA = any[][];
import * as moment from 'moment';
import { wardModel } from 'src/app/core/models/IWard';
import { LocationService } from 'src/app/core/services/location.service';

import {
  IMasticRoadResponse,
  MasticRoadModel,
} from 'src/app/core/models/IMasticRoadModel';
import { Router } from '@angular/router';
import { MasticworkService } from 'src/app/core/services/masticwork.service';

@Component({
  selector: 'app-mastic-road-data-entry',
  templateUrl: './mastic-road-data-entry.component.html',
  styleUrls: ['./mastic-road-data-entry.component.scss']
})
export class MasticRoadDataEntryComponent {


  constructor(
    private locationService: LocationService,
    private masticService: MasticworkService,
    private router: Router,
  ) {
    this.locationService.getWards().subscribe(
      (result) => {
        if (result.status === 200) {
          this.wardList = result.data;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  data: AOA = [
    [1, 2],
    [3, 4],
  ];

  upload = false;
  wardList: wardModel[];

  uploadListener(event: any): void {
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      debugger;
      console.log('Excel Data' + this.data);
      if(this.data) {
        this.upload = true;
      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  UploadClick() {
    this.getDataRecordsArray();
  }

  startDate_info: Date;
  endDate_info: Date;
  dataEntryModelUpload:any;

  async getDataRecordsArray() {
    for (let i = 1; i < this.data.length; i = i + 1) {
      let j = i + 1;      
      if (this.data[i].length) {        
        if (this.data[i][0] != '') {          
          var ward: any = this.wardList.filter(w => w.wardName === this.data[i][0] );
          let attr1 = {            
            wardName: ward[0]._id,
            locationName: this.data[i][1],
            length: this.data[i][2],
            width: this.data[i][3],
            existingSurface: this.data[i][4],
            sideStrip: this.data[i][5],
            dlp:  this.data[i][6],
            nonDlp:  this.data[i][7],  
            division:  this.data[i][8],               

            createdOn: new Date(),
            createdBy: sessionStorage.getItem('FullName'),
            modifiedOn: new Date(),
            modifiedBy: sessionStorage.getItem('FullName'),
          };   
          
          this.dataEntryModelUpload = { attributeValues: [attr1]  };
          debugger;   
          this.addMasticlocation(this.dataEntryModelUpload.attributeValues[0])          
        }
      }
    }
  }

  objLocation: MasticRoadModel;
  
  addMasticlocation(objLocation) {    
    this.objLocation = objLocation;
    debugger;
    this.masticService.addMasticLocation(this.objLocation).subscribe((result) => {      
      debugger;
      if(result != null) {
        if (result.status === 201) {
          debugger;
          (err) => {
            // this.notificationService.warn(':: ' + err);
          };
          this.upload = false; 
          Swal.fire({
            text: 'Road Created',
            icon: 'success',
          });
          this.router.navigate(['location/masticroadlist']);
        }
        if (result.status === 202) {
        }
      }
      else {
        Swal.fire({
          title: 'Seesion Expired',
          text: 'Login Again to Continue',
          icon: 'warning',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.value) {
            
            this.logOut();
          }
        });
      }        
      },
      (err) => {
      }
    );

  }
  
  logOut(){
    this.router.navigate(["/login/"]);
    sessionStorage.clear();
    window.location.reload();
  }

}
