import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/models/loginModel';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import { ReportsModel } from '../../../core/models/reportsModel';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import * as moment from 'moment';


@Component({
  selector: 'app-export-to-excel',
  templateUrl: './export-to-excel.component.html',
  styleUrls: ['./export-to-excel.component.scss'],
})
export class ExportToExcelComponent implements OnInit {
  @ViewChild('excelexporttable') excelexporttable: ElementRef;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private dbCallingService: DbCallingService
  ) { }

  reportmodel: ReportsModel;
  loginModel: LoginModel;
  reportsSearchForm: FormGroup;
  lstReportDataExcel: any = [] 

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

    this.dbCallingService.getInternalPortalDropDownData(obj).subscribe((res) => {
     
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
        this.uniqueZone = [... new Set(this.NallahData.map(s => s.ZoneRegion))];

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
    }
    else {
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
      this.reportmodel.ShiftTimeFrom = ''
      this.reportmodel.ShiftTimeTo = ''

    }
    else {
      this.ShiftIsAactive = false;
    }
  }
  morningHourlyIsAactiveChange(e) {
   
    this.morningHourlyIsAactive = e.target.checked;

    if (this.morningHourlyIsAactive == true) {
      this.reportmodel.Trans_Time_UL = e.target.value;
      this.afternoonHourlyIsAactive = false;
      this.nightHourlyIsAactive = false;
      let tms = e.target.value.slit("-")
      this.reportmodel.ShiftTimeFrom = tms[0];
      this.reportmodel.ShiftTimeTo = tms[1];

    } else {
      this.reportmodel.ShiftTimeFrom = ''
      this.reportmodel.ShiftTimeTo = ''
    }
  }
  afternoonHourlyIsAactiveChange(e) {
   
    this.afternoonHourlyIsAactive = e.target.checked;

    if (this.afternoonHourlyIsAactive == true) {
      this.reportmodel.Trans_Time_UL = e.target.value;
      this.morningHourlyIsAactive = false;
      this.nightHourlyIsAactive = false;
      let tms = e.target.value.slit("-")
      this.reportmodel.ShiftTimeFrom = tms[0];
      this.reportmodel.ShiftTimeTo = tms[1];
    } else {
      this.reportmodel.ShiftTimeFrom = ''
      this.reportmodel.ShiftTimeTo = ''
    }
  }
  nightHourlyIsAactiveChange(e) {
   
    this.nightHourlyIsAactive = e.target.checked;

    if (this.nightHourlyIsAactive == true) {
      this.reportmodel.Trans_Time_UL = e.target.value;
      this.afternoonHourlyIsAactive = false;
      this.morningHourlyIsAactive = false;
      let tms = e.target.value.slit("-")
      this.reportmodel.ShiftTimeFrom = tms[0];
      this.reportmodel.ShiftTimeTo = tms[1];
    } else {
      this.reportmodel.ShiftTimeFrom = ''
      this.reportmodel.ShiftTimeTo = ''
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
    '11 AM-11:59:59 AM'
  ];
  getMorningHour(e) {
   
  }

  afternoonHourDDL: any = [
    '7 AM-7:59:59 AM',
    '8 AM-8:59:59 AM',
    '9 AM-9:59:59 AM',
    '10 AM-10:59:59 AM',
    '11 AM-11:59:59 AM'
  ];
  getafternoonHour(e) {
   
  }

  nightHourDDL: any = [
    '7 AM-7:59:59 AM',
    '8 AM-8:59:59 AM',
    '9 AM-9:59:59 AM',
    '10 AM-10:59:59 AM',
    '11 AM-11:59:59 AM'
  ];
  getnightHour(e) {
   
  }

  lstSearchResults: any = [];
  lstReportData: any = [];
  pagesize = 10;
  PageNumber = 1;

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


  onSubmit() {
    this.lstReportData = []
    this.lstReportDataExcel = [];
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
    };

    // console.log(obj1);
    if (this.reportmodel.FormDate != undefined && this.reportmodel.todate != undefined) {
      if (new Date(this.reportmodel.FormDate) > new Date(this.reportmodel.todate)) {
        Swal.fire({
          text: ' From Date Must be less than To date',
          icon: 'warning'
        })
      }
      else {
        this.dbCallingService.getSearchReports(obj1).subscribe((resp) => {
          //
          this.lstSearchResults = resp;

          if (this.lstSearchResults.ServiceResponse > 0) {
            this.lstReportData = this.lstSearchResults.Data;

            this.totalNoOfVehicles = this.lstReportData.length;
            this.totalInVehicles = this.lstReportData.length;
            this.totalOutVehicles = this.lstReportData.length;

            // for (var i = 0; i < this.lstReportData.length; i++) {
            //   this.grossWeightTotal = this.grossWeightTotal + Number(this.lstReportData[i].Gross_Weight);
            // }

            this.grossWeightTotal = this.lstReportData.reduce((p, c) => p + Number(c.Gross_Weight), 0).toFixed(2)


            this.totalGrossWeightInKG = this.grossWeightTotal;
            this.totalGrossWeightInTon = this.totalGrossWeightInKG / 1000;

            // for (var j = 0; j < this.lstReportData.length; j++) {
            //   this.actualNetWeightTotal = this.actualNetWeightTotal + Number(this.lstReportData[j].Act_Net_Weight);
            // }

            this.actualNetWeightTotal = this.lstReportData.reduce((p, c) => p + Number(c.Act_Net_Weight), 0).toFixed(2)

            this.totalActualNetWeightInKG = this.actualNetWeightTotal;
            this.totalActualNetWeightInTon = this.totalActualNetWeightInKG / 1000;

            // for (var k = 0; k < this.lstReportData.length; k++) {
            //   this.unladenWeightTotal = this.unladenWeightTotal + Number(this.lstReportData[k].Unladen_Weight)
            // }

            this.unladenWeightTotal = this.lstReportData.reduce((p, c) => p + Number(c.Unladen_Weight), 0).toFixed(2)

            this.totalUnladenWeightInKg = this.unladenWeightTotal;
            this.totalUnladenWeightInTon = this.totalUnladenWeightInKg / 1000;
            //this.exportToExcel();

            console.log(this.lstReportData)
            this.lstReportDataExcel = this.lstReportData.map(v => ({
              Location: v.Weighbridge,
              Slip_No: v.SlipSrNo,
              Transaction_Date_In: v.Trans_Date,
              Transaction_Time_In: v.Trans_Time,
              Logsheet_No: v.DC_No,
              Agency: v.Agency_Name,
              Vehicle_No: v.Vehicle_No,
              Vehicle_Type: v.VehicleType,
              Work_Code: v.WorkCode,
              Ward: v.Ward,
              Type_Of_Waste: v.Type_of_Garbage,
              Gross_Weight_Kg: v.Gross_Weight,
              Unladen_Weight_Kg: v.Unladen_Weight,
              ActualNet_Weight_Kg: v.Act_Net_Weight,
              Trans_Date_UL_Out: v.Trans_Date_UL,
              Trans_Time_UL_Out: v.Trans_Time_UL
            }))
            let emtyArr = {
              Location: " ",
              Slip_No: " ",
              Transaction_Date_In: "",
              Transaction_Time_In: "",
              Logsheet_No: " ",
              Agency: "",
              Vehicle_No: "",
              Vehicle_Type: "",
              Work_Code: "",
              Ward: "",
              Type_Of_Waste: "",
              Gross_Weight_Kg: "",
              Unladen_Weight_Kg: "",
              ActualNet_Weight_Kg: "",
              Trans_Date_UL_Out: "",
              Trans_Time_UL_Out: ""
            }
            this.lstReportDataExcel.push(emtyArr)
            let newItems =
            {
              Location: 'Total No. of Vehicles',
              Slip_No: 'Total In Vehicles',
              Transaction_Date_In: 'Total Out Vehicles',
              Transaction_Time_In: 'Total Gross Weight',
              Logsheet_No: 'Total Unladen Weight',
              Agency: 'Total Actual Net Weight',
              Vehicle_No: 'Note: Cancelled slips are excluded from the above calculations.'
            }
            this.lstReportDataExcel.push(newItems)


            let nl = {
              Location: this.totalNoOfVehicles,
              Slip_No: this.totalInVehicles,
              Transaction_Date_In: this.totalOutVehicles,
              Transaction_Time_In: this.grossWeightTotal,
              Logsheet_No: this.unladenWeightTotal,
              Agency: this.actualNetWeightTotal
            }

            this.lstReportDataExcel.push(nl)

            // this.lstReportDataExcel.push(...newItems)

            this.ExportTOExcel()
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



  fileName = "ExportToExcelReport_" + moment(new Date()).format('DDMMYYYY') + ".xlsx";

  ExportTOExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.lstReportDataExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }






}
