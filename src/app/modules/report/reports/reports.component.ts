import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/models/loginModel';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import { ReportsModel } from '../../../core/models/reportsModel';
import { AgGridAngular } from '@ag-grid-community/angular';
import { BtnCellRenderer } from './button-cell-renderer.component';
import { BtnLinkCellRenderer } from './buttonLink-cell-renderer.component';
import { BtnViewCellRenderer } from './buttonView-cell-renderer.component';
import { BtnMoreCellRenderer } from './buttonMore-cell-renderer.component';
import { CheckBoxCellRenderer } from './checkbox-cell-renderer.component';
import Swal from 'sweetalert2';
import { isPostfixUnaryExpression } from 'typescript/lib/tsserverlibrary';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private dbCallingService: DbCallingService
  ) {}

  reportmodel: ReportsModel;
  loginModel: LoginModel;
  reportsSearchForm: FormGroup;

  dropdownData: any = [];
  AgencyData: any = [];
  GarbageData: any = [];
  NallahData: any = [];
  ShiftData: any = [];
  WeighBridgeData: any = [];
  VehcleData: any = [];
  WardData: any = [];
  WorkCodeData: any = [];
  uniqueZone: any[];
  uniqueWorkcode: any[];
  ngOnInit() {
    this.reportmodel = new ReportsModel();
    this.loginModel = new LoginModel();

    this.reportsSearchForm = this._fb.group({
      Weighbridge: [''],
      FormData: [''],
      todate: [''],
      selectNallah: [''],
      reportType: [''],
    });

    this.getInternalPortalDropDownData();
  }
  back() {
    this.router.navigateByUrl('/dashboard');
  }
  // New code - Rucha - starts here

  getInternalPortalDropDownData() {
    var obj = { UserID: Number(sessionStorage.getItem('UserId')) };

    this.dbCallingService
      .getInternalPortalDropDownData(obj)
      .subscribe((res) => {
        this.dropdownData = res;
        if (this.dropdownData.Msg == 'Successful') {
          this.AgencyData = this.dropdownData.AgencyData;
          this.GarbageData = this.dropdownData.GarbageData;
          this.NallahData = this.dropdownData.NallahData;
          this.ShiftData = this.dropdownData.ShiftData;
          this.WeighBridgeData = this.dropdownData.TransactData;
          this.VehcleData = this.dropdownData.VehcleData;
          this.WardData = this.dropdownData.WardData;
          this.WorkCodeData = this.dropdownData.WorkCodeData;
          this.uniqueZone = [
            ...new Set(this.NallahData.map((s) => s.ZoneRegion)),
          ];
        }
      });
  }
  getWeighBridge(e) {
    this.reportmodel.Weighbridge = e.target.value;
  }
  reportTypeList: any = [
    { id: 0, value: 'Out' },
    { id: 1, value: 'In' },
    // { id: 2, value: 'missing' },
    // { id: 3, value: 'cancel' },
  ];
  getreportType(e) {
    this.reportmodel.reportType = Number(e.target.value);
  }
  ReportTypesCheckChange(e) {
    this.ReportTypesAactive = e.target.checked;

    if (this.ReportTypesAactive == false) {
      this.GrossWeightInKAactive = false;
      this.AgencynameIsAactive = false;
      this.vehicleNumberIsAactive = false;
      this.ShiftIsAactive = false;
      this.HourlyIsAactive = false;
      this.TypeOfGarbageIsAactive = false;
      this.WardIsAactive = false;
      this.WorkCodeIsAactive = false;

      this.reportmodel.Gross_Weight_From = 0.0;
      this.reportmodel.Gross_Weight_To = 0.0;
      this.reportmodel.agencyName = '';
      this.reportmodel.Vehicle_No = '';
      this.reportmodel.Act_Shift = '';
      this.reportmodel.Trans_Time = '';
      this.reportmodel.TypeOfGarbage = '';
      this.reportmodel.Ward = '';
      this.reportmodel.Work_code = '';
    }
  }
  getNallah(e) {
    this.reportmodel.selectNallah = e.target.value;
    this.uniqueWorkcode = [
      ...new Set(
        this.NallahData.filter((f) => f.ZoneRegion === e.target.value).map(
          (s) => s.Workcode
        )
      ),
    ];
  }
  GrossWeightInKAactive = false;
  isGrossWeightInKGChange(e) {
    this.GrossWeightInKAactive = e.target.checked;
    if (this.GrossWeightInKAactive == false) {
      this.reportmodel.Gross_Weight_From = 0.0;
      this.reportmodel.Gross_Weight_To = 0.0;
    }
  }
  getAgencyname(e) {
    this.reportmodel.agencyName = e.target.value;
  }
  AgencynameIsAactive = false;
  isAgencynameChange(e) {
    this.AgencynameIsAactive = e.target.checked;

    if (this.AgencynameIsAactive == false) {
      this.reportmodel.agencyName = '';
      // this.reportmodel.Gross_Weight_To = 0.0;
    }
  }
  getvehicleNumber(e) {
    this.reportmodel.Vehicle_No = e.target.value;
  }
  vehicleNumberIsAactive = false;
  isvehicleNumberChange(e) {
    this.vehicleNumberIsAactive = e.target.checked;

    if (this.vehicleNumberIsAactive == false) {
      this.reportmodel.Vehicle_No = '';
      // this.reportmodel.Gross_Weight_To = 0.0;
    }
  }
  getTypeOfGarbage(e) {
    this.reportmodel.TypeOfGarbage = e.target.value;
  }
  TypeOfGarbageIsAactive = false;
  isTypeOfGarbageChange(e) {
    this.TypeOfGarbageIsAactive = e.target.checked;

    if (this.TypeOfGarbageIsAactive == false) {
      this.reportmodel.TypeOfGarbage = '';
      // this.reportmodel.Gross_Weight_To = 0.0;
    }
  }
  getWard(e) {
    this.uniqueWorkcode = [
      ...new Set(
        this.NallahData.filter((f) => f.Ward === e.target.value).map(
          (s) => s.Workcode
        )
      ),
    ];

    this.reportmodel.Ward = e.target.value;
  }
  WardIsAactive = false;
  isWardChange(e) {
    this.WardIsAactive = e.target.checked;

    if (this.WardIsAactive == false) {
      this.reportmodel.Ward = '';
      // this.reportmodel.Gross_Weight_To = 0.0;
    }
  }
  getWorkCode(e) {
    this.reportmodel.Work_code = e.target.value;
  }
  WorkCodeIsAactive = false;
  isWorkCodeChange(e) {
    this.WorkCodeIsAactive = e.target.checked;

    if (this.WorkCodeIsAactive == false) {
      this.reportmodel.Work_code = '';
      // this.reportmodel.Gross_Weight_To = 0.0;
    }
  }

  ReportTypesAactive = false;

  // Shift Checkbox Code
  ShiftIsAactive = false;
  ShiftIsAactive1 = false;
  ShiftIsAactive2 = false;
  ShiftIsAactive3 = false;
  isShiftChange(e) {
    this.ShiftIsAactive = e.target.checked;
    if (this.ShiftIsAactive == false) {
      this.reportmodel.Act_Shift = '';
      this.ShiftIsAactive1 = false;
      this.ShiftIsAactive2 = false;
      this.ShiftIsAactive3 = false;
    } else {
      this.HourlyIsAactive = false;
    }
  }
  isShift1Change(e) {
    this.ShiftIsAactive1 = e.target.checked;

    if (this.ShiftIsAactive1 == true) {
      this.reportmodel.Act_Shift_UL = 'I';
      this.ShiftIsAactive2 = false;
      this.ShiftIsAactive3 = false;
    }
  }
  isShift2Change(e) {
    this.ShiftIsAactive2 = e.target.checked;

    if (this.ShiftIsAactive2 == true) {
      this.reportmodel.Act_Shift_UL = 'II';
      this.ShiftIsAactive3 = false;
      this.ShiftIsAactive1 = false;
    }
  }
  isShift3Change(e) {
    this.ShiftIsAactive3 = e.target.checked;

    if (this.ShiftIsAactive3 == true) {
      this.reportmodel.Act_Shift_UL = 'III';
      this.ShiftIsAactive1 = false;
      this.ShiftIsAactive2 = false;
    }
  }

  // Hour Checkbox Code
  HourlyIsAactive = false;
  morningHourlyIsAactive = false;
  afternoonHourlyIsAactive = false;
  nightHourlyIsAactive = false;

  isHourlyChange(e) {
    this.HourlyIsAactive = e.target.checked;

    if (this.HourlyIsAactive == false) {
      this.morningHourlyIsAactive = false;
      this.afternoonHourlyIsAactive = false;
      this.nightHourlyIsAactive = false;

      this.reportmodel.Trans_Time = '';
      this.reportmodel.ShiftTimeFrom = '';
      this.reportmodel.ShiftTimeTo = '';
    } else {
      this.ShiftIsAactive = false;
    }
  }
  morningHourlyIsAactiveChange(e) {
    this.morningHourlyIsAactive = e.target.checked;

    if (this.morningHourlyIsAactive == true) {
      this.reportmodel.Trans_Time_UL = e.target.value;
      this.afternoonHourlyIsAactive = false;
      this.nightHourlyIsAactive = false;
      let tms = e.target.value.slit('-');
      this.reportmodel.ShiftTimeFrom = tms[0];
      this.reportmodel.ShiftTimeTo = tms[1];
    } else {
      this.reportmodel.ShiftTimeFrom = '';
      this.reportmodel.ShiftTimeTo = '';
    }
  }
  afternoonHourlyIsAactiveChange(e) {
    this.afternoonHourlyIsAactive = e.target.checked;

    if (this.afternoonHourlyIsAactive == true) {
      this.reportmodel.Trans_Time_UL = e.target.value;
      this.morningHourlyIsAactive = false;
      this.nightHourlyIsAactive = false;
      let tms = e.target.value.slit('-');
      this.reportmodel.ShiftTimeFrom = tms[0];
      this.reportmodel.ShiftTimeTo = tms[1];
    } else {
      this.reportmodel.ShiftTimeFrom = '';
      this.reportmodel.ShiftTimeTo = '';
    }
  }
  nightHourlyIsAactiveChange(e) {
    this.nightHourlyIsAactive = e.target.checked;

    if (this.nightHourlyIsAactive == true) {
      this.reportmodel.Trans_Time_UL = e.target.value;
      this.afternoonHourlyIsAactive = false;
      this.morningHourlyIsAactive = false;
      let tms = e.target.value.slit('-');
      this.reportmodel.ShiftTimeFrom = tms[0];
      this.reportmodel.ShiftTimeTo = tms[1];
    } else {
      this.reportmodel.ShiftTimeFrom = '';
      this.reportmodel.ShiftTimeTo = '';
    }
  }

  morningHourDDL: any = [
    '7 AM-7:59:59 AM',
    '8 AM-8:59:59 AM',
    '9 AM-9:59:59 AM',
    '10 AM-10:59:59 AM',
    '11 AM-11:59:59 AM',
    '12 AM-12:59:59 AM',
    '1 AM-1:59:59 AM',
    '2 AM-2:59:59 AM',
    '1 AM-10:59:59 AM',
    '11 AM-11:59:59 AM',
  ];
  getMorningHour(e) {}

  afternoonHourDDL: any = [
    '7 AM-7:59:59 AM',
    '8 AM-8:59:59 AM',
    '9 AM-9:59:59 AM',
    '10 AM-10:59:59 AM',
    '11 AM-11:59:59 AM',
  ];
  getafternoonHour(e) {}

  nightHourDDL: any = [
    '7 AM-7:59:59 AM',
    '8 AM-8:59:59 AM',
    '9 AM-9:59:59 AM',
    '10 AM-10:59:59 AM',
    '11 AM-11:59:59 AM',
  ];
  getnightHour(e) {}

  lstSearchResults: any = [];
  lstReportData: any = [];
  pagesize = 10;
  PageNumber = 1;

  columnDefs;
  context;
  gridApi;
  gridColumnApi;
  defaultColDef;
  rowSelection;
  frameworkComponents;

  onSubmit() {
    this.reportmodel;
    let obj1 = {
      FromDate: this.reportmodel.FormDate,
      ToDate: this.reportmodel.todate,
      ReportType: this.reportmodel.reportType,
      PageSize: this.pagesize,
      PageNumber: this.PageNumber,
      GrossFromWeight: this.reportmodel.Gross_Weight_From,
      GrossToWeight: this.reportmodel.Gross_Weight_To,
      AgencyName: this.reportmodel.agencyName,
      VehicleNumber: this.reportmodel.Vehicle_No,
      GarbageType: this.reportmodel.TypeOfGarbage,
      Ward: this.reportmodel.Ward,
      Shift: this.reportmodel.Act_Shift,
      Work_code: this.reportmodel.Work_code,
      NallahType: this.reportmodel.selectNallah,
      WeighBrigde: this.reportmodel.Weighbridge,
      ShiftTimeFrom: this.reportmodel.ShiftTimeFrom,
      ShiftTimeTo: this.reportmodel.ShiftTimeTo,
      VerifiedStatus: this.reportmodel.VerifiedStatus,
      AuthorizedStatus: this.reportmodel.AuthorizedStatus,
    };
    console.log(obj1);
    if (
      this.reportmodel.FormDate != undefined &&
      this.reportmodel.todate != undefined
    ) {
      if (
        new Date(this.reportmodel.FormDate) > new Date(this.reportmodel.todate)
      ) {
        Swal.fire({
          text: ' From Date Must be less than To date',
          icon: 'warning',
        });
      } else {
        this.dbCallingService.getSearchReports(obj1).subscribe((resp) => {
          this.lstSearchResults = resp;

          if (this.lstSearchResults.ServiceResponse > 0) {
            this.lstReportData = this.lstSearchResults.Data;

            // this.lstReportData[0].inImageURL = '../../../../assets/VehicleImages/InVehicleImages/1.jpg';
            // this.lstReportData[1].inImageURL = '../../../../assets/VehicleImages/InVehicleImages/2.JPG';
            // this.lstReportData[2].inImageURL = '../../../../assets/VehicleImages/InVehicleImages/2.jpeg';

            // this.lstReportData[0].outImageURL = '../../../../assets/VehicleImages/OutVehicleImages/1.jpg';
            // this.lstReportData[1].outImageURL = '../../../../assets/VehicleImages/OutVehicleImages/2.jpg';

            this.getAGGridReady();
          } else {
            Swal.fire({
              text: 'No Data!',
              icon: 'warning',
            });
          }
        });
      }
    } else {
      Swal.fire({
        text: 'Enter FromDate & Todate!',
        icon: 'warning',
      });
    }
  }

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
    //

    this.totalNoOfVehicles = this.lstReportData.length;
    this.totalInVehicles = this.lstReportData.length;
    this.totalOutVehicles = this.lstReportData.length;

    for (var i = 0; i < this.lstReportData.length; i++) {
      this.grossWeightTotal =
        this.grossWeightTotal + Number(this.lstReportData[i].Gross_Weight);
    }
    //
    this.totalGrossWeightInKG = this.grossWeightTotal;
    this.totalGrossWeightInTon = this.totalGrossWeightInKG / 1000;

    for (var j = 0; j < this.lstReportData.length; j++) {
      this.actualNetWeightTotal =
        this.actualNetWeightTotal +
        Number(this.lstReportData[j].Act_Net_Weight);
    }
    //
    this.totalActualNetWeightInKG = Number(this.actualNetWeightTotal);
    this.totalActualNetWeightInTon = this.totalActualNetWeightInKG / 1000;

    for (var k = 0; k < this.lstReportData.length; k++) {
      this.unladenWeightTotal =
        this.unladenWeightTotal + Number(this.lstReportData[k].Unladen_Weight);
    }
    //
    this.totalUnladenWeightInKg = Number(this.unladenWeightTotal);
    this.totalUnladenWeightInTon = this.totalUnladenWeightInKg / 1000;

    this.columnDefs = [
      {
        headerName: 'Verified Status',
        field: 'VerifiedStatus',
        cellRenderer: 'checkBoxCellRenderer',
      },
      {
        headerName: 'Verified Status bool',
        field: 'VerifiedStatus',
      },
      {
        headerName: 'Authorized',
        field: 'AuthorizedStatus',
        cellRenderer: 'checkBoxCellRenderer',
      },
      {
        headerName: 'Authorized',
        field: 'AuthorizedStatus',
      },
      { headerName: 'Location', field: 'Weighbridge' },
      {
        headerName: 'Slip No',
        field: 'SlipSrNoNew',
        cellStyle: { 'font-weight': 'bold' },
      },
      {
        headerName: 'Transaction Date',
        field: 'Trans_Date',
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
        minWidth: 100,
      },
      { headerName: 'Transaction Time', field: 'Trans_Time' },
      { headerName: 'DC No', field: 'DC_No' },
      { headerName: 'Agency', field: 'Agency_Name' },
      { headerName: 'Vehicle Number', field: 'Vehicle_No' },
      { headerName: 'Vehicle Type', field: 'VehicleType' },
      { headerName: 'Work Code', field: 'WorkCode' },
      { headerName: 'Ward', field: 'Ward' },
      { headerName: 'Type of Waste', field: 'Type_of_Garbage' },
      { headerName: 'Gross Weight', field: 'Gross_Weight' },
      {
        headerName: 'Transaction Date UL',
        field: 'Trans_Date_UL',
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
      { headerName: 'Trans Time UL', field: 'Trans_Time_UL' },
      { headerName: 'Unladen Weight', field: 'Unladen_Weight' },
      { headerName: 'Actual Net Weight', field: 'Act_Net_Weight' },

      {
        headerName: 'In Vehicle Image',
        field: 'SlipSrNo',
        cellRenderer: 'btnCellRenderer',
      },
      {
        headerName: 'Out Vehicle Image',
        field: 'SlipSrNo',
        cellRenderer: 'btnLinkCellRenderer',
      },

      {
        headerName: 'View Details',
        field: 'SlipSrNo',
        cellRenderer: 'btnViewCellRenderer',
      },

      {
        headerName: 'View More',
        field: 'SlipSrNo',
        cellRenderer: 'btnMoreCellRenderer',
      },
    ];

    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
      btnLinkCellRenderer: BtnLinkCellRenderer,
      btnViewCellRenderer: BtnViewCellRenderer,
      btnMoreCellRenderer: BtnMoreCellRenderer,
      checkBoxCellRenderer: CheckBoxCellRenderer,
    };

    this.context = { componentParent: this };

    this.defaultColDef = {
      sortable: true,
      // flex: 1,
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
    //this.gridApi =params.api.sizeColumnsToFit();
  }

  headerHeightSetter(params) {
    var padding = 20;
    var height = headerHeightGetter() + padding;
    this.gridApi.setHeaderHeight(height);
    this.gridApi.resetRowHeights();
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

  columnHeaderTexts.forEach((node) => columnHeaderTextsArray.push(node));

  var clientHeights = columnHeaderTextsArray.map(
    (headerText) => headerText.clientHeight
  );
  var tallestHeaderTextHeight = Math.max(...clientHeights);
  return tallestHeaderTextHeight;
}
