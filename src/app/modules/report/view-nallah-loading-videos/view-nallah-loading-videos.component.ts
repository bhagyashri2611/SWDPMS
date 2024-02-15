import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import { SiltQuantityModel } from 'src/app/core/models/ISiltquantityModel';
import Swal from 'sweetalert2';
import { AgGridAngular } from '@ag-grid-community/angular';

@Component({
  selector: 'app-view-nallah-loading-videos',
  templateUrl: './view-nallah-loading-videos.component.html',
  styleUrls: ['./view-nallah-loading-videos.component.scss']
})
export class ViewNallahLoadingVideosComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  lstSearchResults: any = [];
  lstUnLoadingVideos: any = [];
  pagesize = 10;
  PageNumber = 1;

  columnDefs;
  context;
  gridApi;
  gridColumnApi;
  defaultColDef;
  rowSelection;
  frameworkComponents;

  Form: FormGroup;
  Zonelist: SiltQuantityModel[] = [];
  Parentlist: SiltQuantityModel[] = [];
  Workcodelist: SiltQuantityModel[] = [];
  CumulativeProgressList: SiltQuantityModel[] = [];
  Nallalist: SiltQuantityModel[] = [];
  uniqueZone: any[] = [];
  uniqueParentcode: any[] = [];
  uniqueWorkcode: any[] = [];

  constructor(private fb: FormBuilder, private dbCallingService: DbCallingService,
    private router: Router
  ) {
    let obj = {
      UserId: Number(sessionStorage.getItem("UserId")),
    };
    this.dbCallingService.GetMajorZonewiseDDLDataByUserID(obj).subscribe((res) => {
      this.Zonelist = res.Data;
      if (this.Zonelist) {
        this.uniqueZone = [...new Set(this.Zonelist.map((s) => s.Zone))];
        if (this.uniqueZone) {
          if (this.uniqueZone.length === 1) {
            this.Form.patchValue({
              zone: this.uniqueZone[0]
            })
            this.getUniqueParentCode(this.uniqueZone[0]);
          }
        }
      } else {
        Swal.fire({
          text: 'No data found!',
          icon: 'warning',
        });
      }
    });
  }

  ngOnInit() {
    this.Form = this.fb.group({
      zone: ["", Validators.required],
      parentcode: ["", Validators.required],
      workcode: ["", Validators.required],
      nalla: ["", Validators.required],
    });


    this.getAGGridReady();
  }
  onZoneChange(event) {
    this.uniqueParentcode = [];
    this.uniqueWorkcode = [];
    this.Nallalist = [];
    this.Form.patchValue({
      parentcode: "",
      workcode: "",
      nalla:""
    })
    this.getUniqueParentCode(event.target.value);

  }
  getUniqueParentCode(szone) {
    if (this.Zonelist) {
      this.uniqueParentcode = [...new Set(this.Zonelist.filter((f) => f.Zone === szone).map((s) => s.Parentcode))];

      if (this.uniqueParentcode) {
        if (this.uniqueParentcode.length === 1) {
          this.Form.patchValue({
            parentcode: this.uniqueParentcode[0]
          })
          this.getUniqueWorkCode(this.uniqueParentcode[0])
        }
        else{          
          this.Form.patchValue({
            parentcode: "",
            workcode: ""
          })
      }
      }
    }
  }
  onParentcodeChange(event) {
    this.uniqueWorkcode = [];
    this.Nallalist = [];
    this.Form.patchValue({
    
      workcode: "",
      nalla:""
    })
    this.getUniqueWorkCode(event.target.value)
  }
  getUniqueWorkCode(sparentcode) {
   
    if (this.Zonelist && sparentcode) {
      this.uniqueWorkcode = [
        ...new Set(
          this.Zonelist.filter((f) => f.Parentcode === sparentcode).map(
            (s) => s.Workcode
          )
        ),
      ];

      if (this.uniqueWorkcode) {
        if (this.uniqueWorkcode.length === 1) {
          this.Form.patchValue({
            workcode: this.uniqueWorkcode[0]
          })
          this.getUniqueNall(this.uniqueWorkcode[0])
        }
        else{          
          this.Form.patchValue({          
            workcode: ""
          })
      }
      }
    }
  }
  onWorkcodeChange(event) {
    this.Nallalist = [];
    this.Form.patchValue({      
      nalla:""
    })
    this.getUniqueNall(event.target.value)
  }
  getUniqueNall(sworkcode) {
    console.log(sworkcode)
    console.log(this.Zonelist)
    if (this.Zonelist && sworkcode) {
      this.Nallalist = this.Zonelist.filter(f => f.Workcode === sworkcode);
    }
    if (this.Nallalist) {
      if (this.Nallalist.length === 1) {
        this.Form.patchValue({
          nalla: this.Nallalist[0].SiltQuantityID
        })
      }
      else{        
          this.Form.patchValue({
          nalla: ""
        })        
      }
    }
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultColDef = params.defaultColDef;
    this.context = params.context;
    // this.rowData=params.rowData;
  }
  onSubmit() {
    this.lstUnLoadingVideos=[]
    let obj = {
      UserId: Number(sessionStorage.getItem("UserId")),
      Zone: (this.Form.value.zone) ? this.Form.value.zone : null,
      Parentcode: (this.Form.value.parentcode) ? this.Form.value.parentcode : null,
      Workcode: (this.Form.value.workcode) ? this.Form.value.workcode : null,
      SiltQuantityID: (this.Form.value.nalla) ? this.Form.value.nalla : null,

    }
    // if (this.Form.value.fromdate!="" && this.Form.value.fromdate != undefined && this.Form.value.todate!="" && this.Form.value.todate != undefined) {
      // if (new Date(this.Form.value.fromdate) > new Date(this.Form.value.todate)) {
      //   Swal.fire({
      //     text: ' From Date Must be less than To date',
      //     icon: 'warning'
      //   })
      // }
     
    this.dbCallingService.getSiteVideoData(obj).subscribe((res) => {
      this.CumulativeProgressList = res.Data;
     // console.log(res.Data);
      if (res.ServiceResponse === 1) {
        if (res.Data) {
          this.lstUnLoadingVideos = res.Data;
        }
        else {
          Swal.fire({
            text: 'No Record Found !',
            icon: 'warning'
          });
        }
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
  
// }
// else {
//   Swal.fire({
//     text: 'Enter FromDate & Todate!',
//     icon: 'warning'
//   })
// }
  }
  back() {
    this.router.navigateByUrl('/dashboard');
  }
  getAGGridReady() {

    this.columnDefs = [
      { headerName: 'Nalla ID', field: 'SiltQuantityID', maxWidth: 80 },
      { headerName: 'Zone', field: 'Zone', maxWidth: 70 },
      { headerName: 'Ward', field: 'Ward', maxWidth: 70 },
      { headerName: 'Nallah No', field: 'NallahNo', cellStyle: { 'font-weight': 'bold' }, maxWidth: 70 },
      { headerName: 'CatchmentNumber', field: 'CatchmentNumber', maxWidth: 150 },
      { headerName: 'Nallah System', field: 'NallahSystem', maxWidth: 200 },
      { headerName: 'Nallah Length', field: 'NallahLength', maxWidth: 100 },
      { headerName: 'Avg Width', field: 'AvgWidth', maxWidth: 80 },
      { headerName: 'Pre-monsoon Desilt Quantity', field: 'PremonsoonDesiltQuantity', maxWidth: 100 },
      { headerName: 'During-Monsoon Desilt Quantity', field: 'DuringMonsoonDesiltQuantity', maxWidth: 100 },
      { headerName: 'After-Monsoon Desilt Quantity', field: 'AftrMonsoonDesiltQuantity', maxWidth: 100 },
      { headerName: 'Total Desilt Quantity', field: 'TotalDesiltQuantity', maxWidth: 100 },
      { headerName: 'Total Vehicle', field: 'TotalVehicle', maxWidth: 100 },
      { headerName: 'Total Net Weight', field: 'TotalActNetWeight', maxWidth: 100 },
      { headerName: '% of completion', field: 'PercentOfPremonsoon', maxWidth: 100 },
      { headerName: 'Total Net Weight', field: 'BillableQuantity', maxWidth: 100 },
      { headerName: '% of completion (Billable)', field: 'BillablePercent', maxWidth: 100 },

    ];

    this.frameworkComponents = {
    };

    this.context = { componentParent: this };

    this.defaultColDef = {
      sortable: true,
      // flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
      wrapText: true,
      autoHeight: true,
      sortingOrder: ["asc", "desc"],
      enableRowSelection: true,
      enableFullRowSelection: true,
      enableHighlighting: true,
      enableCellTextSelection: true,
      suppressMovable: true
    };
  }


}
