import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ILocationResponse,
  LocationModel,
} from 'src/app/core/models/ILocation';
import { CommonService } from 'src/app/core/services/common.service';
import { LocationService } from 'src/app/core/services/location.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FilterComponent } from '../../../CustomViews/dashboard-widgets/filter/filter.component';
import { DataentryService } from 'src/app/core/services/dataentry.service';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-contractor-remarks',
  templateUrl: './contractor-remarks.component.html',
  styleUrls: ['./contractor-remarks.component.scss'],
})
export class ContractorRemarksComponent {
  locationForm: FormGroup;
  locationResponce: ILocationResponse;
  locationList: LocationModel[];
  objLocation: LocationModel;
  userRole = sessionStorage.getItem('UserRole');
  userLocations: string[];
  dataEntryDataList: any = [];
  filteredArray: any = [];
  newGridData: any = [];

  gridApi;
  gridColumnApi;
  sortingOrder;
  rowSelection;
  columnDefs;
  frameworkComponents;
  context;
  defaultColDef;
  selectedRows;
  selected;
  rowData: any = [];
  gridOption;

  gridOptions = {
    rowHeight: 40,
    getRowHeight: function (params) {
      return 40;
    },
  };

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private dataEntryService: DataentryService,
    private router: Router,
    private commonService: CommonService,
    private userService: UserService,
    private locationService: LocationService,
    public matDialog: MatDialog
  ) {}

  async ngOnInit(): Promise<void> {
    this.locationService.dataEntrySearchParams.subscribe((result) => {
      console.log(result);
    });

    await this.getLocation();

    console.log('ng init report', this.objLocation);
    this.columnDefs = [
      {
        headerName: 'Data Date',
        field: 'dataDate',
        minWidth: 100,
        valueGetter: (params) => {
          return this.commonService.DateFormatter(params.data.dataDate);
        },
      },
      {
        headerName: 'Road Name',
        field: 'locationName',
        minWidth: 150,
      },
      {
        headerName: 'Zone',
        field: 'zone',
        minWidth: 100,
      },
      {
        headerName: 'Ward',
        field: 'ward',
        minWidth: 100,
      },
      {
        headerName: 'Contractor Name',
        field: 'contractorName',
        minWidth: 150,
      },
      {
        headerName: 'Road Length',
        field: 'location.length',
        minWidth: 100,
      },
      {
        headerName: 'Task Name',
        field: 'moduleName',
        minWidth: 100,
      },
      {
        headerName: 'Target',
        field: 'attributeValues.totalquantity',
        minWidth: 100,
      },
      {
        headerName: 'Achieved',
        field: 'attributeValues.consumedquantity',
        minWidth: 100,
      },
      {
        headerName: 'Contractor Achieved',
        field: 'attributeValues.contractorquantity',
        minWidth: 150,
      },
      {
        headerName: 'Contractor Remark',
        field: 'attributeValues.contractorremark',
        minWidth: 150,
      },
      {
        headerName: 'Created By',
        field: 'createdBy',
        minWidth: 150,
      },
      {
        headerName: 'Created On',
        field: 'createdOn',
        minWidth: 150,
        valueGetter: (params) => {
          return this.commonService.DateFormatter(params.data.createdOn);
        },
      },
    ];

    this.defaultColDef = {
      sortable: true,
      flex: 1,
      minWidth: 120,
      filter: true,
      resizable: true,
      wrapText: true,
      autoHeight: true,
      sortingOrder: ['asc', 'desc'],
      enableRowSelection: true,
      enableFullRowSelection: true,
      enableHighlighting: true,
      enableCellTextSelection: true,
    };
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultColDef = params.defaultColDef;
    this.context = params.context;
  }
  async getLocation(): Promise<void> {
    const result = await (this.userRole === 'Data Owner'
      ? this.locationService.getLocations()
      : this.locationService.getLocationByUser()
    ).toPromise();

    if (result != null) {
      if (result.status === 200) {
        this.locationList = result.data;
        this.userLocations = this.locationList.map((m) => m._id);
        this.dataEntryService
          .getDataEntryByUser({ location: this.userLocations })
          .subscribe(async (result) => {
            this.dataEntryDataList = result.data;
            this.rowData = this.dataEntryDataList;
            this.rowData.sort((a,b)=> (a.locationName.localeCompare(b.locationName) || a.dataDate - b.dataDate));  
           
          });

      } else {
        Swal.fire({
          text: String(result.message),
          icon: 'error',
        });
      }
    } else {
      Swal.fire({
        title: 'Session Expired',
        text: 'Login Again to Continue',
        icon: 'warning',
        confirmButtonText: 'Ok',
      }).then(() => this.logOut());
    }
  }

  logOut() {
    this.router.navigate(['/login/']);
    sessionStorage.clear();
    window.location.reload();
  }

  download() {
    const newArray = this.rowData.map((el) => {
      return {
        Date: this.commonService.DateFormatter(el.dataDate),
        LocationName: el.locationName,
        ZoneName: el.zone,
        WardName: el.ward,
        ContractorName: el.contractorName,
        RoadLength: el.location.length,
        TaskName: el.moduleName,
        Target: el.attributeValues.totalquantity,
        Achieved: el.attributeValues.consumedquantity,
        ContractorAchieved: el.attributeValues.contractorquantity,
        ContractorRemark: el.attributeValues.contractorremark,
        CreatedBy:el.createdBy,
        createdOn:el.createdOn
      };
    });

    let fileName =
      'Contractor Remarks Report ' +
      moment(new Date()).format('DDMMYYYY') +
      '.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newArray);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }

  filter() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '600px';
    dialogConfig.width = '500px';
    dialogConfig.position = {
      top: '100px', // Example: 50px from the top of the viewport
      //left: '300px' // Example: 50px from the left of the viewport
    };
    dialogConfig.panelClass = 'rounded-dialog'; // Apply custom CSS class for rounded corners
    this.matDialog.open(FilterComponent, dialogConfig);
  }
}
