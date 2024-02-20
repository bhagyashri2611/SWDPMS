import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SiltQuantityModel } from 'src/app/core/models/ISiltquantityModel';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import Swal from 'sweetalert2';
import { BtnCellRenderer } from '../reports/button-cell-renderer.component';
import { BtnLinkCellRenderer } from '../reports/buttonLink-cell-renderer.component';
import { BtnMoreCellRenderer } from '../reports/buttonMore-cell-renderer.component';
import { BtnViewCellRenderer } from '../reports/buttonView-cell-renderer.component';

import { AgGridAngular } from '@ag-grid-community/angular';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
@Component({
  selector: 'app-billable-silt-report',
  templateUrl: './billable-silt-report.component.html',
  styleUrls: ['./billable-silt-report.component.scss']
})
export class BillableSiltReportComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;

  Form: FormGroup;
  Zonelist: SiltQuantityModel[] = [];

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
    this.uniqueParentcode = [];
    this.uniqueWorkcode = [];
    this.Form.patchValue({
      parentcode: "",
      workcode: ""
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
        }else{          
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
    this.Form.patchValue({    
      workcode: ""
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
        }else{          
          this.Form.patchValue({
            workcode: ""
          })
      }
      }
    }
  }

  billableSearchData: any = [];
  dbResult: any = [];

  onSubmit() {
    this.billableSearchData=[]
    let obj = {
      UserId: Number(sessionStorage.getItem("UserId")),
      Zone: (this.Form.value.zone) ? this.Form.value.zone : null,
      Parentcode: (this.Form.value.parentcode) ? this.Form.value.parentcode : null,
      Workcode: (this.Form.value.workcode) ? this.Form.value.workcode : null,
      FromDate: this.Form.value.fromdate,
      ToDate: this.Form.value.todate,
    };
    console.log(obj)
    if (this.Form.value.fromdate!="" && this.Form.value.fromdate != undefined && this.Form.value.todate!="" && this.Form.value.todate != undefined) {
      if (new Date(this.Form.value.fromdate) > new Date(this.Form.value.todate)) {
        Swal.fire({
          text: ' From Date Must be less than To date',
          icon: 'warning'
        })
      }
      else {
        this.dbCallingService.getBillableSearchData(obj).subscribe((res) => {
          this.dbResult = res;
          if (this.dbResult.ServiceResponse > 0) {
            this.billableSearchData = res.Data;
            
            this.getAGGridReady();         

          }
          else {
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


    this.totalNoOfVehicles = this.billableSearchData.length;
    this.totalInVehicles = this.billableSearchData.length;
    this.totalOutVehicles = this.billableSearchData.length;

    // for (var i = 0; i < this.billableSearchData.length; i++) {
    //   this.grossWeightTotal = this.grossWeightTotal + Number(this.billableSearchData[i].Gross_Weight);
    // }
    this.grossWeightTotal=this.billableSearchData.reduce((p,c)=>p+Number(c.Gross_Weight),0).toFixed(2)

    this.totalGrossWeightInKG = this.grossWeightTotal;
    this.totalGrossWeightInTon = this.totalGrossWeightInKG / 1000;

    // for (var j = 0; j < this.billableSearchData.length; j++) {
    //   this.actualNetWeightTotal = this.actualNetWeightTotal + Number(this.billableSearchData[j].Act_Net_Weight)
    // }

    this.actualNetWeightTotal=this.billableSearchData.reduce((p,c)=>p+Number(c.Act_Net_Weight),0).toFixed(2)

    this.totalActualNetWeightInKG = Number(this.actualNetWeightTotal);
    this.totalActualNetWeightInTon = this.totalActualNetWeightInKG / 1000;

    // for (var k = 0; k < this.billableSearchData.length; k++) {
    //   this.unladenWeightTotal = this.unladenWeightTotal + Number(this.billableSearchData[k].Unladen_Weight)
    // }

    this.unladenWeightTotal=this.billableSearchData.reduce((p,c)=>p+Number(c.Unladen_Weight),0).toFixed(2)

    this.totalUnladenWeightInKg = Number(this.unladenWeightTotal);
    this.totalUnladenWeightInTon = this.totalUnladenWeightInKg / 1000;

    this.columnDefs = [
      { headerName: 'Location', field: 'Weighbridge', minWidth: 80 },
      { headerName: 'Slip No', field: 'SlipSrNoNew', cellStyle: { 'font-weight': 'bold' }, minWidth: 100 },
      { headerName: 'DC No', field: 'DC_No',  minWidth: 100 },
      
      {
        headerName: 'Trans Date In', field: 'Trans_Date', comparator: dateComparator, filterParams: {
          debounceMs: 500,
          suppressAndOrCondition: true,
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            if (cellValue == null) {
              return 0;
            }
            var dateParts = cellValue.split("-");
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
          }
        }, minWidth: 100
      },
      { headerName: 'Trans Time In', field: 'Trans_Time' },
      { headerName: 'Agency', field: 'Agency_Name', minWidth: 70 },
      { headerName: 'Vehicle Number', field: 'Vehicle_No', minWidth: 60 },
      { headerName: 'Vehicle Type', field: 'VehicleType', minWidth: 100 },
      { headerName: 'Work Code', field: 'WorkCode', },
      { headerName: 'Ward', field: 'Ward', },
      { headerName: 'Type of Waste', field: 'Type_of_Garbage', },
      { headerName: 'Gross Weight (Kg)', field: 'Gross_Weight', },
      {
        headerName: 'Trans Date UL', field: 'Trans_Date_UL', comparator: dateComparator, filterParams: {
          debounceMs: 500,
          suppressAndOrCondition: true,
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            if (cellValue == null) {
              return 0;
            }
            var dateParts = cellValue.split("-");
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
          }
        }
      },
      { headerName: 'Trans Time UL', field: 'Trans_Time_UL', },
      { headerName: 'Unladen Weight (Kg)', field: 'Unladen_Weight', },
      { headerName: 'Actual Net Weight (Kg)', field: 'Act_Net_Weight', },
    

      { headerName: 'Billable Gross Weight (Kg)', field: 'BillableGrossWeight', },
      { headerName: 'Billable Unladen Weight (Kg)', field: 'BillableUnladenWeight', },
      { headerName: 'Billable Net Weight (Kg)', field: 'BillableNetWeight', },

      {
        headerName: 'InVehicleImage',
        field: 'SlipSrNo',
        cellRenderer: 'btnCellRenderer'
      },
      {
        headerName: 'OutVehicleImage',
        field: 'SlipSrNo',
        cellRenderer: 'btnLinkCellRenderer'
      },

      {
        headerName: 'ViewDetails',
        field: 'SlipSrNo',
        cellRenderer: 'btnViewCellRenderer'
      },

      {
        headerName: 'View More',
        field: 'SlipSrNo',
        cellRenderer: 'btnMoreCellRenderer'
      },
    ];

    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
      btnLinkCellRenderer: BtnLinkCellRenderer,
      btnViewCellRenderer: BtnViewCellRenderer,
      btnMoreCellRenderer: BtnMoreCellRenderer,

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

  fileName = "BillableReport_"+ moment(new Date()).format('DDMMYYYY')+".xlsx";
  lstBillableExportData: any = [];

  export() {
    let obj = {
      UserId: Number(sessionStorage.getItem("UserId")),
      Zone: (this.Form.value.zone) ? this.Form.value.zone : null,
      Parentcode: (this.Form.value.parentcode) ? this.Form.value.parentcode : null,
      Workcode: (this.Form.value.workcode) ? this.Form.value.workcode : null,
      FromDate: this.Form.value.fromdate,
      ToDate: this.Form.value.todate,
    };
    if (this.Form.value.fromdate != undefined && this.Form.value.todate != undefined) {
      if (new Date(this.Form.value.fromdate) > new Date(this.Form.value.todate)) {
        Swal.fire({
          text: ' From Date Must be less than To date',
          icon: 'warning'
        })
      }
      else {
        this.dbCallingService.getBillableSearchData(obj).subscribe((res) => {
          debugger;
          this.dbResult = res;
          if (this.dbResult.ServiceResponse > 0) {
            debugger; 
            this.lstBillableExportData = res.Data;

            if (this.lstBillableExportData.length > 0) {
              this.totalNoOfVehicles = this.lstBillableExportData.length;
              this.totalInVehicles = this.lstBillableExportData.length;
              this.totalOutVehicles = this.lstBillableExportData.length;

              // for (var i = 0; i < this.lstBillableExportData.length; i++) {
              //   this.grossWeightTotal =
              //     this.grossWeightTotal +
              //     Number(this.lstBillableExportData[i].Gross_Weight);
              // }
              this.grossWeightTotal=this.lstBillableExportData.reduce((p,c)=>p+Number(c.Gross_Weight),0).toFixed(2)

              this.totalGrossWeightInKG = this.grossWeightTotal;
              this.totalGrossWeightInTon = this.totalGrossWeightInKG / 1000;

              // for (var j = 0; j < this.lstBillableExportData.length; j++) {
              //   this.actualNetWeightTotal =
              //     this.actualNetWeightTotal +
              //     Number(this.lstBillableExportData[j].Act_Net_Weight);
              // }
              this.actualNetWeightTotal=this.lstBillableExportData.reduce((p,c)=>p+Number(c.Act_Net_Weight),0).toFixed(2)

              this.totalActualNetWeightInKG = this.actualNetWeightTotal;
              this.totalActualNetWeightInTon = this.totalActualNetWeightInKG / 1000;

              // for (var k = 0; k < this.lstBillableExportData.length; k++) {
              //   this.unladenWeightTotal =
              //     this.unladenWeightTotal +
              //     Number(this.lstBillableExportData[k].Unladen_Weight);
              // }
              this.unladenWeightTotal=this.lstBillableExportData.reduce((p,c)=>p+Number(c.Unladen_Weight),0).toFixed(2)

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
    }
    else {
      Swal.fire({
        text: 'Enter FromDate & Todate!',
        icon: 'warning'
      })
    }
  }

  exportToExcel() {
    debugger;
    if (this.lstBillableExportData.length > 0) {
      let element = document.getElementById('BillableExportTable');
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
