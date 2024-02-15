import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import { SiltQuantityModel } from 'src/app/core/models/ISiltquantityModel';
import Swal from 'sweetalert2';

import { BtnCellRenderer } from './button-cell-renderer.component';
import { BtnLinkCellRenderer } from './buttonLink-cell-renderer.component';
import { BtnViewCellRenderer } from './buttonView-cell-renderer.component';
import { BtnMoreCellRenderer } from './buttonMore-cell-renderer.component';

import { AgGridAngular } from '@ag-grid-community/angular';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-loadingtrips',
  templateUrl: './loadingtrips.component.html',
  styleUrls: ['./loadingtrips.component.scss']
})
export class LoadingtripsComponent implements OnInit {

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;

  Form: FormGroup;
  Zonelist: SiltQuantityModel[] = [];
  Parentlist: SiltQuantityModel[] = [];
  Workcodelist: SiltQuantityModel[] = [];

  uniqueZone: any[] = [];
  uniqueParentcode: any[] = [];
  uniqueWorkcode: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dbCallingService: DbCallingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.Form = this.fb.group({
      zone: ['', Validators.required],
      parentcode: ['', Validators.required],
      workcode: ['', Validators.required],
      // nalla: ["", Validators.required],
      fromdate: ['', Validators.required],
      todate: ['', Validators.required],
    });
    let obj = {
      UserId: Number(sessionStorage.getItem("UserId")),
    };
    this.dbCallingService.GetAllZonewiseDDLDataByUserID(obj).subscribe((res) => {
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

  onZoneChange(event) {
    this.uniqueParentcode=[];
    this.uniqueWorkcode=[];
    this.getUniqueParentCode(event.target.value);

  }
  getUniqueParentCode(szone) {
    if (this.Zonelist) {
      this.uniqueParentcode = [...new Set(this.Zonelist.filter((f) => f.Zone === szone).map((s) => s.Parentcode))];

      if (this.uniqueParentcode) {
        if (this.uniqueParentcode.length === 1) {
          // this.uniqueWorkcode = [
          //   ...new Set(
          //     this.Zonelist.filter((f) => f.Parentcode === szone).map(
          //       (s) => s.Workcode
          //     )
          //   ),
          // ];  
          this.Form.patchValue({
            parentcode: this.uniqueParentcode[0]
          })
          this.getUniqueWorkCode(this.uniqueParentcode[0])
        }
      }
    }
  }
  onParentcodeChange(event) {  
    this.uniqueWorkcode=[];
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
        }
      }
    }
  }

  tripwiseSearchData: any = [];
  dbResult: any = [];

  onSubmit() {
    let obj = {
      UserId: Number(sessionStorage.getItem("UserId")),
      Zone: (this.Form.value.zone) ? this.Form.value.zone : null,
      Parentcode: (this.Form.value.parentcode) ? this.Form.value.parentcode : null,
      Workcode: (this.Form.value.workcode) ? this.Form.value.workcode : null,
      FromDate: this.Form.value.fromdate,
      ToDate: this.Form.value.todate,
    };
    if (this.Form.value.fromdate!="" && this.Form.value.fromdate != undefined && this.Form.value.todate!="" && this.Form.value.todate != undefined) {
      if (new Date(this.Form.value.fromdate) > new Date(this.Form.value.todate)) {
        Swal.fire({
          text: ' From Date Must be less than To date',
          icon: 'warning'
        })
      }
      else {
    this.dbCallingService.getGetLoadingTrips(obj).subscribe((res) => {
      debugger;
      this.dbResult = res;
      if (this.dbResult.ServiceResponse > 0) {
        debugger;
        this.tripwiseSearchData = res.Data;

        if (this.tripwiseSearchData.length > 0) {
          // this.tripwiseSearchData[0].inImageURL =
          //   '../../../../assets/VehicleImages/InVehicleImages/1.jpg';
          // this.tripwiseSearchData[1].inImageURL =
          //   '../../../../assets/VehicleImages/InVehicleImages/2.JPG';
          // this.tripwiseSearchData[2].inImageURL =
          //   '../../../../assets/VehicleImages/InVehicleImages/2.jpeg';

          // this.tripwiseSearchData[0].outImageURL =
          //   '../../../../assets/VehicleImages/OutVehicleImages/1.jpg';
          // this.tripwiseSearchData[1].outImageURL =
          //   '../../../../assets/VehicleImages/OutVehicleImages/2.jpg';

          this.getAGGridReady();
        }
      } else {
        Swal.fire({
          text: 'No Data !',
          icon: 'warning',
        });
      }
    });
  }
}
else {
  Swal.fire({
    text: 'Enter FromDate & Todate!',
    icon: 'warning'
  })
}
  }

  columnDefs;
  context;
  gridApi;
  gridColumnApi;
  defaultColDef;
  rowSelection;
  frameworkComponents;

  totalNoOfVehicles: any;
  totalInVehicles: any;
  totalOutVehicles: any;

  totalGrossWeightInKG: any;
  totalGrossWeightInTon: any;

  totalUnladenWeightInKg: any;
  totalUnladenWeightInTon: any;

  totalActualNetWeightInKG: any;
  totalActualNetWeightInTon: any;

  grossWeightTotal = 0;
  actualNetWeightTotal = 0;
  unladenWeightTotal = 0;

  getAGGridReady() {
   

   
    this.columnDefs = [
      { headerName: 'Trip Status'
      ,valueGetter: function(params) {
        if(params.data.TripStatus === 0) {
            return "Pending";
        } else {
            return "Completed";
        }
    
        },
        cellStyle: params => params.data.TripStatus > 0 ? { color: 'green' } : { color: 'red' }
    },
      { headerName: 'Img ID', field: 'ImgMapID' ,hide: "true" },
      { headerName: 'Logsheet No', field: 'LogSheetNo'},
      { headerName: 'Vehicle No', field: 'VehicleNo' },
      { headerName: 'Vehicle Type', field: 'VehicleType' },
      {
        headerName: 'Loading Date',   field: 'ImageMappingDate',
        comparator: dateComparator,
        filterParams: {
          debounceMs: 500,
          suppressAndOrCondition: true,
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            if (cellValue == null) {
              return 0;
            }
            var dateParts = cellValue.split('-');
            var year = Number(dateParts[2]);
            var month = Number(dateParts[1]) - 1;
            var day = Number(dateParts[0]);
            var cellDate = new Date(year, month, day);

            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          },
        },
       
      },
      { headerName: 'Zone', field: 'Zone' },
      { headerName: 'Parentcode', field: 'Parentcode' },  
      { headerName: 'Workcode', field: 'WorkCode' },     
      { headerName: 'Nallah Name', field: 'NallahSystem'}, 
      { headerName: 'Agengy', field: 'AgencyName' },   
      { headerName: 'View More', field: 'ImgMapID', cellRenderer: 'btnMoreCellRenderer'},
      
    ];

    this.frameworkComponents = {      
      btnMoreCellRenderer: BtnMoreCellRenderer,
      btnCellRenderer:BtnCellRenderer
    };

    this.context = { componentParent: this };
    this.defaultColDef = {
      sortable: true,
      // flex: 1,
      maxWidth: 150,
      filter: true,
      resizable: true,
      wrapText: true,
      autoHeight: true,
      sortingOrder: ['asc', 'desc'],
      enableRowSelection: true,
      enableFullRowSelection: true,
      enableHighlighting: true,
      enableCellTextSelection: true,
      suppressMovable: true,
      headerComponentParams: {
        template:
          '<div class="ag-cell-label-container" role="presentation">' +
          '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
          '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
          '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
          '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
          '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
          '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
          '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
          '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
          '  </div>' +
          '</div>',
      },
    };
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultColDef = params.defaultColDef;
    this.context = params.context;
   
  }

  headerHeightSetter(params) {
    var padding = 20;
    var height = headerHeightGetter() + padding;
    this.gridApi.setHeaderHeight(height);
    this.gridApi.resetRowHeights();
  }
  back() {
    this.router.navigateByUrl('/dashboard');
  }

  fileName = 'TripWiseReportSheet.xlsx';
  lsttripwisewiseExportData: any = [];

  export() {
    let obj = {
      UserId: Number(sessionStorage.getItem("UserId")),
      Zone: (this.Form.value.zone) ? this.Form.value.zone : null,
      Parentcode: (this.Form.value.parentcode) ? this.Form.value.parentcode : null,
      Workcode: (this.Form.value.workcode) ? this.Form.value.workcode : null,
      FromDate: this.Form.value.fromdate,
      ToDate: this.Form.value.todate,
    };

    this.dbCallingService.getTripwiseSearchData(obj).subscribe((res) => {
      debugger;
      this.dbResult = res;
      if (this.dbResult.ServiceResponse > 0) {
        debugger;
        this.lsttripwisewiseExportData = res.Data;

        if (this.lsttripwisewiseExportData.length > 0) {
          this.totalNoOfVehicles = this.lsttripwisewiseExportData.length;
          this.totalInVehicles = this.lsttripwisewiseExportData.length;
          this.totalOutVehicles = this.lsttripwisewiseExportData.length;

          for (var i = 0; i < this.lsttripwisewiseExportData.length; i++) {
            this.grossWeightTotal =
              this.grossWeightTotal +
              Number(this.lsttripwisewiseExportData[i].Gross_Weight);
          }
          debugger;
          this.totalGrossWeightInKG = this.grossWeightTotal;
          this.totalGrossWeightInTon = this.totalGrossWeightInKG / 1000;

          for (var j = 0; j < this.lsttripwisewiseExportData.length; j++) {
            this.actualNetWeightTotal =
              this.actualNetWeightTotal +
              Number(this.lsttripwisewiseExportData[j].Act_Net_Weight);
          }
          debugger;
          this.totalActualNetWeightInKG = this.actualNetWeightTotal;
          this.totalActualNetWeightInTon = this.totalActualNetWeightInKG / 1000;

          for (var k = 0; k < this.lsttripwisewiseExportData.length; k++) {
            this.unladenWeightTotal =
              this.unladenWeightTotal +
              Number(this.lsttripwisewiseExportData[k].Unladen_Weight);
          }
          debugger;
          this.totalUnladenWeightInKg = this.unladenWeightTotal;
          this.totalUnladenWeightInTon = this.totalUnladenWeightInKg / 1000;

          this.exportToExcel();
        } else {
          Swal.fire({
            text: 'No Data to export!',
            icon: 'error',
          });
        }
      } else {
        Swal.fire({
          text: 'No Data to export!',
          icon: 'error',
        });
      }
    });
  }

  exportToExcel() {
    debugger;
    if (this.lsttripwisewiseExportData.length > 0) {
      let element = document.getElementById('WorkCodeExportTable');
      /* pass here the table id */
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    } else {
      Swal.fire({
        text: 'No Data to export!',
        icon: 'error',
      });
    }
  }


}


function dateComparator(date1, date2) {
  var date1Number = _monthToNum(date1);
  var date2Number = _monthToNum(date2);

  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }

  return date1Number - date2Number;
}
// HELPER FOR DATE COMPARISON
function _monthToNum(date) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }

  var yearNumber = date.substring(6, 10);
  var monthNumber = date.substring(3, 5);
  var dayNumber = date.substring(0, 2);

  var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
  // 29/08/2004 => 20040829
  return result;
}
function headerHeightGetter() {
  var columnHeaderTexts = document.querySelectorAll('.ag-header-cell-text');

  var columnHeaderTextsArray = [];

  columnHeaderTexts.forEach(node => columnHeaderTextsArray.push(node));

  var clientHeights = columnHeaderTextsArray.map(
    headerText => headerText.clientHeight
  );
  var tallestHeaderTextHeight = Math.max(...clientHeights);
  return tallestHeaderTextHeight;
}