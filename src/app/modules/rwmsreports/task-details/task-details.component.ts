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
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  locationForm: FormGroup;
  locationResponce: ILocationResponse;
  locationList: LocationModel[];
  objLocation: LocationModel;
  userRole = sessionStorage.getItem('UserRole');
  uniqueLocationNames: string[] = [];
  uniqueWardNames: string[] = [];
  uniqueZoneNames: string[] = [];
  uniqueContractorNames: string[] = [];
  uniqueRoadType: string[] = [];
  uniqueRoadStatus: string[] = [];
  uniqueWorkCode: string[] = [];
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
    this.getLocation();
    this.columnDefs = [
      {
        headerName: 'Date',
        field: 'dataDate',
        minWidth: 150,
      },
      {
        headerName: 'Road Name',
        field: 'locationName',
        minWidth: 150,
      },
      {
        headerName: 'Zone',
        field: 'zoneName',
        minWidth: 100,
      },
      {
        headerName: 'Ward',
        field: 'wardName',
        minWidth: 100,
      },
      {
        headerName: 'Contractor Name',
        field: 'contractorName',
        minWidth: 150,
      },
      {
        headerName: 'Road Length',
        field: 'length',
        minWidth: 110,
      },
      {
        headerName: 'Road Status',
        field: 'status',
        minWidth: 110,
      },
      {
        headerName: 'SWD Work',
        field: 'swd',
        minWidth: 100,
      },
      {
        headerName: 'Excavation',
        field: 'excavation',
        minWidth: 100,
      },
      {
        headerName: 'Laying of Duct',
        field: 'duct',
        minWidth: 120,
      },
      {
        headerName: 'PQC',
        field: 'pqc',
        minWidth: 100,
      },
      {
        headerName: 'Created By',
        field: 'createdBy',
        minWidth: 100,
      },
      {
        headerName: 'Created On',
        field: 'createdOn',
        minWidth: 100,
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
          .subscribe((result) => {
            if (result && result.data) {
              this.dataEntryDataList = result.data;
              debugger;
              console.log('Data Entry List', this.dataEntryDataList);
              this.getData();
            }
          });
        this.sortLocationList();
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

  sortLocationList(): void {
    this.locationList.sort((a, b) =>
      a.locationName.localeCompare(String(b.locationName))
    );
  }
  onQuickFilterChanged() {
    let val = (<HTMLInputElement>document.getElementById('quickFilter')).value;
    this.agGrid.api.setQuickFilter(val);
  }
  getData() {
    this.locationList.forEach((location) => {
      let dataEntryLocation = this.dataEntryDataList.filter(
        (dataentry) => dataentry.locationName === location.locationName
      );
      let dates = [
        ...new Set(
          dataEntryLocation.map((f) => {
            return f.dataDate;
          })
        ),
      ];
      let locations = [
        ...new Set(
          dataEntryLocation.map((f) => {
            return f.locationName;
          })
        ),
      ];

      let dataEntryFilter;
      dates.forEach((date) => {
        locations.forEach((location) => {
          dataEntryFilter = this.dataEntryDataList.filter(
            (f) => f.dataDate === date && f.locationName === location
          );
        });

        let obj = {
          locationName: dataEntryFilter[0].location.locationName,
          dataDate: this.commonService.DateFormatter(dataEntryFilter[0].dataDate),
          zoneName: dataEntryFilter[0].zone,
          wardName: dataEntryFilter[0].ward,
          contractorName: dataEntryFilter[0].contractorName,
          length: dataEntryFilter[0].location.length,
          status:dataEntryFilter[0].location.status,
          swd: dataEntryFilter
            .filter((f) => f.moduleName === 'SWD Work')
            .map((m) => m.attributeValues.consumedquantity)[0],
          pqc: dataEntryFilter
            .filter((f) => f.moduleName === 'Completion of Crust (PQC)')
            .map((m) => m.attributeValues.consumedquantity)[0],
          excavation: dataEntryFilter
            .filter((f) => f.moduleName === 'Excavation')
            .map((m) => m.attributeValues.consumedquantity)[0],
          duct: dataEntryFilter
            .filter((f) => f.moduleName === 'Laying of Duct')
            .map((m) => m.attributeValues.consumedquantity)[0],
         createdBy:dataEntryFilter[0].createdBy,
         createdOn:dataEntryFilter[0].createdOn
        };
        this.rowData.push(obj);
      });
      
      //console.log(this.rowData);
      
      //console.log('dataEntryLocation', dataEntryLocation);
      //console.log('dates', dates);
    });
    console.log(this.rowData);
      
    debugger;
  }

  logOut() {
    this.router.navigate(['/login/']);
    sessionStorage.clear();
    window.location.reload();
  }

  handleError(error: any): void {
    Swal.fire({
      text: error,
      icon: 'error',
    });
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultColDef = params.defaultColDef;
    this.context = params.context;
  }

  download() {
    let fileName =
      'Date Wise Task Details Report ' +
      moment(new Date()).format('DDMMYYYY') +
      '.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
    debugger;
  }
}
