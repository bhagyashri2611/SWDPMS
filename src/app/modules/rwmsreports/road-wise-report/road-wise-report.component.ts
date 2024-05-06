import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationModel } from 'src/app/core/models/ILocation';
import { ModulesInLocationModel } from 'src/app/core/models/IModules-In-Location';
import { CommonService } from 'src/app/core/services/common.service';
import { LocationService } from 'src/app/core/services/location.service';
import Swal from 'sweetalert2';

import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';

import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-road-wise-report',
  templateUrl: './road-wise-report.component.html',
  styleUrls: ['./road-wise-report.component.scss']
})
export class RoadWiseReportComponent implements OnInit{
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;

  locationList: LocationModel[];
  moduleInLocationList: ModulesInLocationModel[] = [];

  userRole: String;

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private commonService: CommonService
  ) {  }

  mil: any[] = [];
  filteredList: any = [];
  getLocationTable() {
    this.rowData = [];
    this.filteredList = this.moduleInLocationList.map((item2) => {
      // 
      let correspondingItem = this.locationList.find(
        (item1) => item1._id === item2.location._id
      );
      if (correspondingItem != undefined) {
        return {
          ...correspondingItem,
          taskName: item2.module.moduleName,
          Quantity: item2.quantity,
          cumulativeQuantity: item2.cumulativeQuantity,
          wardId: correspondingItem.wardName._id,
          ward: correspondingItem.wardName.wardName,
          percentageProgress: (( item2.cumulativeQuantity / item2.quantity) * 100 ).toFixed(2)
        };
      }
    });
    this.filteredList = this.filteredList.filter((item) => item !== undefined);
    debugger;
    this.rowData = this.filteredList;
    if (this.currentRoute != '' && this.object != '') {
      let newFilteredList = this.rowData.filter(
        (item) =>
          (this.object.zone === '' ||
            this.object.zone.includes(item.zoneName)) &&
          (this.object.ward === '' ||
            this.object.ward.includes(item.wardName.wardName)) &&
          (this.object.contractor === '' ||
            this.object.contractor.includes(item.contractorName)) &&
          (this.object.status === '' ||
            this.object.status.includes(item.status)) &&
          (this.object.roadName === '' ||
            this.object.roadName.includes(item.locationName))
      );
      debugger;
      this.rowData = newFilteredList;
    }
   
  }
  

  gridOptions = {
    rowHeight: 40,
    getRowHeight: function (params) {
      return 40;
    },
  };

  currentRoute: any = '';
  object: any;

  async ngOnInit() {
    this.rowData = [];

    this.currentRoute = '';
    this.object = {};

    this.userRole = sessionStorage.getItem('UserRole');
    if (this.userRole === 'Data Owner') {
      this.locationService.getLocations().subscribe(
        (result) => {
          if (result != null) {
            if (result.status === 200) {
              this.locationList = result.data;
              this.locationList = this.locationList.sort((a, b) =>
                String(a.locationName).localeCompare(String(b.locationName))
              );

              if (this.locationList.length > 0) {
                this.locationService
                  .getAllModulInLocationForDashboard()
                  .subscribe((result) => {
                    if (result != null) {
                      if (result) {
                        this.moduleInLocationList = result.data;
                        if (this.moduleInLocationList.length > 0) {
                          this.getLocationTable();
                        }
                      } else {
                        alert('No Data Found');
                      }
                    } else {
                    }
                  });
              }
            }
          } else {
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
          Swal.fire({
            text: err,
            icon: 'error',
          });
        }
      );
    }  else if (this.userRole === 'Data Viewer') {
      this.locationService.getLocations().subscribe(
        (result) => {
          if (result != null) {
            if (result.status === 200) {
              this.locationList = result.data;
              const userWardString = sessionStorage.getItem('UserWard');

              // Split the UserWard string into an array of ward names
              const userWards = userWardString.split(',');

              // Filter the locationList based on the ward names
              const filteredLocations = this.locationList.filter((location) =>
                userWards.includes(String(location.wardName.wardName))
              );
              this.locationList=filteredLocations
              this.locationList = this.locationList.sort((a, b) =>
                String(a.locationName).localeCompare(String(b.locationName))
              );

              if (this.locationList.length > 0) {
                this.locationService
                  .getAllModulInLocationForDashboard()
                  .subscribe((result) => {
                    if (result != null) {
                      if (result) {
                        this.moduleInLocationList = result.data;
                        if (this.moduleInLocationList.length > 0) {
                          this.getLocationTable();
                        }
                      } else {
                        alert('No Data Found');
                      }
                    } else {
                    }
                  });
              }
            }
          } else {
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
          Swal.fire({
            text: err,
            icon: 'error',
          });
        }
      );
    } else {
      this.locationService.getLocationByUser().subscribe(
        (result) => {
          if (result != null) {
            if (result.status === 200) {
              this.locationList = result.data;
              this.locationList = this.locationList.sort((a, b) =>
                String(a.locationName).localeCompare(String(b.locationName))
              );

              if (this.locationList.length > 0) {
                this.locationService
                  .getAllModulInLocationForDashboard()
                  .subscribe((result) => {
                    if (result != null) {
                      if (result) {
                        this.moduleInLocationList = result.data;
                        if (this.moduleInLocationList.length > 0) {
                          this.getLocationTable();
                        }
                      } else {
                        alert('No Data Found');
                      }
                    } else {
                    }
                  });
              }
            }
          } else {
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
          Swal.fire({
            text: err,
            icon: 'error',
          });
        }
      );
    }
    
    this.route.queryParams.subscribe((params) => {
      this.currentRoute = params['param1'];
      this.object = JSON.parse(params['param2']);
    });


    this.columnDefs = [
      {
        headerName: 'Road Name',
        field: 'locationName',
        minWidth: 300,
      },
      {
        headerName: 'Zone',
        field: 'zoneName',
        minWidth: 150,
      },
      
      {
        headerName: 'Ward',
        field: 'wardName.wardName',
        minWidth: 100,
      },
      {
        headerName: 'workCode',
        field: 'workCode',
        minWidth: 150,
      },
      {
        headerName: 'Length',
        field: 'length',
        minWidth: 100,
      },
      {
        headerName: 'Contractor Name',
        field: 'contractorName',
        minWidth: 150,
      }, 
      {
        headerName: 'Task Name',
        field: 'taskName',
        minWidth: 150,
      },            
     
      {
        headerName: 'Quantity',
        field: 'Quantity',
        minWidth: 100,
      },
      {
        headerName: 'Cumulative Quantity',
        field: 'cumulativeQuantity',
        minWidth: 150,
      },      
      {
        headerName: '% Progress',
        field: 'percentageProgress',
        minWidth: 150,
      },
      {
        headerName: 'Status',
        field: 'status',
        minWidth: 150,
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

  onQuickFilterChanged() {
    let val = (<HTMLInputElement>document.getElementById('quickFilter')).value;
    this.agGrid.api.setQuickFilter(val);
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultColDef = params.defaultColDef;
    this.context = params.context;
  }

  download() {
    const newArray = this.rowData.map((el) => {
      return {
        
        LocationName: el.locationName,
        ZoneName: el.zoneName,
        WardName: el.wardName.wardName,
        WorkCode: el.workCode,
        RoadLength: el.length,
        ContractorName: el.contractorName,
        TaskName: el.taskName,
        Quantity: el.Quantity,
        CumulativeQuantity: el.cumulativeQuantity,
        PercentProgress: el.percentageProgress,        
        Status: el.status,
      };
    });

    let fileName = 'Road Wise Report' + moment(new Date()).format('DDMMYYYY') + '.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newArray);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }

  logOut() {
    this.router.navigate(['/login/']);
    sessionStorage.clear();
    window.location.reload();
  }

}