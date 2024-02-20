import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import { MinorSiltQuantityModel } from 'src/app/core/models/IMinorSiltQuantityModel';
import Swal from 'sweetalert2';
import { AgGridAngular } from '@ag-grid-community/angular';
import { ProgressModel } from 'src/app/core/models/IProgressModel';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CustomVFS } from 'src/app/core/services/pdfmakefonts';
import { ColDef } from 'ag-grid-community';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
pdfMake.vfs = CustomVFS.myVfs;
// pdfMake.fonts = {
//   Noto: {
//     normal: "noto-sans-regular.woff",
//     bold: "noto-sans-700.woff"
//   }
// };
@Component({
  selector: 'app-cumulative-minor-nallah-report',
  templateUrl: './cumulative-minor-nallah-report.component.html',
  styleUrls: ['./cumulative-minor-nallah-report.component.scss'],
})
export class CumulativeMinorNallahReportComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  lstSearchResults: any = [];
  lstReportData: any = [];
  minorTable: MinorSiltQuantityModel[] = [];
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
  Zonelist: MinorSiltQuantityModel[] = [];
  Parentlist: MinorSiltQuantityModel[] = [];

  Nallalist: MinorSiltQuantityModel[] = [];
  uniqueZone: any[] = [];
  uniqueParentcode: any[] = [];
  fileName = "MinorCumulativeProgressReport_"+ moment(new Date()).format('DDMMYYYY')+".xlsx";

  constructor(
    private fb: FormBuilder,
    private dbCallingService: DbCallingService,
    private router: Router
  ) {
    let obj = {
      UserId: Number(sessionStorage.getItem('UserId')),
    };
    this.dbCallingService.getMinorSiltQuantityData(obj).subscribe((res) => {
      this.minorTable = res.Data;

      if (this.minorTable) {
        this.uniqueZone = [
          ...new Set(this.minorTable.map((s) => s.ZoneRegion)),
        ];
      } else {
        Swal.fire({
          text: 'No Record Found',
          icon: 'warning',
        });
      }
    });
  }

  ngOnInit() {
    this.Form = this.fb.group({
      zone: ['', Validators.required],
      ward: ['', Validators.required],
      fromdate: ['', Validators.required],
      todate: ['', Validators.required],
    });

  }

  onZoneChange(event) {
    if (this.Zonelist) {
      this.uniqueParentcode = [
        ...new Set(
          this.minorTable
            .filter((f) => f.ZoneRegion === event.target.value)
            .map((s) => s.Ward)
        ),
      ];
    }
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
  onSubmit() {
    this.lstReportData=[];
    let obj = {
      UserId: Number(sessionStorage.getItem('UserId')),
      Zone: this.Form.value.zone ? this.Form.value.zone : null,
      Ward: this.Form.value.ward ? this.Form.value.ward : null,
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
        this.dbCallingService.getMinorNallCumulativeProgressData(obj).subscribe(
          (res) => {
            // this.CumulativeProgressList = res.Data;
            if (res.ServiceResponse === 1) {
              if (this.Zonelist) {
                this.lstReportData = res.Data;
                let PreQuantity = this.lstReportData.reduce(
                  (p, c) => p + Number(c.PremonsoonDesiltQuantity),
                  0
                );
                let actNetwt = this.lstReportData.reduce(
                  (p, c) => p + Number(c.TotalActNetWeight),
                  0
                );
                let BillableActWt = this.lstReportData.reduce(
                  (p, c) => p + Number(c.BillableQuantity),
                  0
                );
                let prcnt = (actNetwt * 100) / PreQuantity;
                let bprcnt = (BillableActWt * 100) / PreQuantity;
                let eachRec = {
                  Area: "",
                  Zone: "Total",
                  Ward: "",
                  Workcode: "",
                  TotalDesiltQuantity: this.lstReportData
                    .reduce((p, c) => p + Number(c.TotalDesiltQuantity), 0)
                    .toFixed(2),
                  PremonsoonDesiltQuantity: this.lstReportData
                    .reduce((p, c) => p + Number(c.PremonsoonDesiltQuantity), 0)
                    .toFixed(2),
                  DuringMonsoonDesiltQuantity: this.lstReportData
                    .reduce((p, c) => p + Number(c.DuringMonsoonDesiltQuantity), 0)
                    .toFixed(2),
                  TotalVehicle: this.lstReportData
                    .reduce((p, c) => p + Number(c.TotalVehicle), 0)
                    .toFixed(2),
                  TotalActNetWeight: actNetwt.toFixed(2),
                  PercentOfPremonsoon: prcnt.toFixed(2),
                  BillableQuantity: BillableActWt.toFixed(2),
                  BillablePercent: bprcnt.toFixed(2),
                };
                this.lstReportData.push(eachRec);
                if (this.lstReportData.length > 0) {
                  this.getAGGridReady();
                }
              } else {
                Swal.fire({
                  text: 'No Record Found !',
                  icon: 'warning',
                });
              }
            } else {
              Swal.fire({
                text: res.Msg,
                icon: 'warning',
              });
            }
          },
          (err) => {
            Swal.fire({
              text: err,
              icon: 'warning',
            });
          }
        );
      }
    }
    else {
      Swal.fire({
        text: 'Enter FromDate & Todate!',
        icon: 'warning'
      })
    }
  }
  back() {
    this.router.navigateByUrl('/dashboard');
  }
  getAGGridReady() {
    this.columnDefs = [
      { headerName: 'Area', field: 'ZoneRegion', maxWidth: 70 },
      { headerName: 'Zone', field: 'Zone', maxWidth: 70 },
      { headerName: 'Ward', field: 'Ward', maxWidth: 70 },
      {
        headerName: 'Workcode',
        field: 'Workcode',
        maxWidth: 100,

      },
      {
        headerName: 'Pre monsoon Desilt Quantity',
        field: 'PremonsoonDesiltQuantity',
        maxWidth: 100,
        // wrapText: true,
        // autoHeight: true,

      },
      {
        headerName: 'During Monsoon Desilt Quantity',
        field: 'DuringMonsoonDesiltQuantity',
        maxWidth: 100,
        // wrapText: true,
        // autoHeight: true,

      },
      {
        headerName: 'Total Desilt Quantity',
        field: 'TotalDesiltQuantity',
        maxWidth: 100,

      },
      {
        headerName: 'Total Vehicle',
        field: 'TotalVehicle',
        maxWidth: 100,

      },
      {
        headerName: 'Total Net Weight (MT)',
        field: 'TotalActNetWeight',
        maxWidth: 100,

      },
      {
        headerName: '% of completion',
        field: 'PercentOfPremonsoon',
        maxWidth: 100,

      },
      {
        headerName: 'Total Billable Net Weight (MT)',
        field: 'BillableQuantity',
        maxWidth: 100,

      },
      {
        headerName: '% of completion (Billable)',
        field: 'BillablePercent',
        maxWidth: 100,

      },
    ];

    this.context = { componentParent: this };

    this.defaultColDef = {
      sortable: true,
      minWidth: 50,
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

  exportToExcel() {
    //debugger;
    if (this.lstReportData.length > 0) {
      let element = document.getElementById('excelexporttable');
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

  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        widths: columns.forEach((element) => '*'),
        body: this.dbCallingService.buildTableBody(data, columns),
      },
    };
  }
  download() {
    const fileName = 'MinorNallaCumulativeProgressReport_'+ moment(new Date()).format('DDMMYYYY');
    const recordList = [];
    this.lstReportData.forEach((rec) => {
      let eachRec = {
        Area: rec.ZoneRegion?rec.ZoneRegion:'',
        Zone: rec.Zone,
        Ward: rec.Ward,
        Workcode: rec.Ward,       
        'Pre monsoon Quanitity': rec.PremonsoonDesiltQuantity,
        'During Monsoon Quanitity': rec.DuringMonsoonDesiltQuantity,
        'Total Silt Quantity': rec.TotalDesiltQuantity,
        'Total Vehicle': rec.TotalVehicle,
        'Total Net Weight (MT)': rec.TotalActNetWeight,
        '% of completion': rec.PercentOfPremonsoon,
        'Total Billable Net Weight (MT)': rec.BillableQuantity,
        '% of completion (billable)': rec.BillablePercent,
      };
      recordList.push(eachRec);
    });

    console.log(recordList);
    var docDefinition = {
      footer: function (currentPage, pageCount) {
        return currentPage.toString() + ' of ' + pageCount;
      },
      // background: [
      //   {
      //     image: CustomVFS.watermarkLogo,
      //     width: 500,
      //     top: 200,
      //     alignment: "center"
      //   }
      // ],
      content: [
        {
          table: {
            widths: [100, '*', 100],
            header: 'center',
            body: [
              [
                {
                  rowSpan: 2,
                  image: CustomVFS.eps95logo,
                  fit: [80, 80],
                  alignment: 'center',
                },
                {
                  text: 'BRIHANMUMBAI MUNICIPAL CORPORATION',
                  alignment: 'center',
                  fontSize: '13',
                  bold: 'true',
                },
                { rowSpan: 2, text: 'SWD De-Silting', alignment: 'center' },
              ],
              [
                '',
                {
                  text:
                    'Progress report of Desilting From ' +
                    moment(this.Form.value.fromdate).format('DD-MMM-yyyy') +
                    ' To ' +
                    moment(this.Form.value.todate).format('DD-MMM-yyyy'),
                  alignment: 'center',
                },
                '',
              ],
            ],
            alignment: 'center',
          },
          pageSize: 'A4',
          pageOrientation: 'landscape',
        },
        // { text: this.hedLocation + '|'  + this.hedFromDate ,alignment:'left' },
        // {
        //   table: {
        //     headerRows: 1,
        //     widths: ['*', '*', '*'],
        //     body: [[{ text: 'Year', alignment: "center", bold: 'true' },{ text:'Dry Weather' , alignment: "center", bold: 'true' },{ text: 'Wet Weather', alignment: "center", bold: 'true' }]]
        //   }
        // },
        this.table(recordList, Object.keys(recordList[0])),
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: 'center',

          lineHeight: 1.25,
        },
        subheader: {
          fontSize: 8,
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 6,
        },
        block: {
          margins: [0, 5],
        },
        tableHeader: {
          bold: true,
          color: 'black',
          alignment: 'center',

          fontSize: 8,
        },
        footnote: {
          fontSize: 6,
          margin: [0, 1, 0, 0],
        },
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
      defaultStyle: {
        //  font: "Noto",
        fontSize: 10,
        alignment: 'center',

        lineHeight: 1.25,
      },
      preserveSpace: {
        preserveLeadingSpaces: true,
      },
    };
    pdfMake.createPdf(docDefinition).download(fileName + '.pdf');
  }
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
