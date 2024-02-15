import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import { SiltQuantityModel } from 'src/app/core/models/ISiltquantityModel';
import Swal from 'sweetalert2';

import { AgGridAngular } from '@ag-grid-community/angular';
import * as XLSX from 'xlsx';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CustomVFS } from 'src/app/core/services/pdfmakefonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';

@Component({
  selector: 'app-workcode-wise-report',
  templateUrl: './workcode-wise-report.component.html',
  styleUrls: ['./workcode-wise-report.component.scss'],
})
export class WorkcodeWiseReportComponent implements OnInit {
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
  ) {}

  ngOnInit() {
    this.Form = this.fb.group({
      zone: ['', Validators.required],
    //  parentcode: ['', Validators.required],
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
        let data = [...new Set(this.Zonelist.map((s) => s.Zone))];
        this.uniqueZone=data.filter(f=>f != "MINOR")
       // console.log(this.uniqueWorkcode.length )
        if (this.uniqueZone) {
          if (this.uniqueZone.length === 1) {
            this.Form.patchValue({
              zone: this.uniqueZone[0]
            });           
            this.getUniqueWorkCode(this.uniqueZone[0]);
          }else{
            this.Form.patchValue({
              zone:""
            }); 
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
    this.uniqueWorkcode=[];
    this.getUniqueWorkCode(event.target.value);
  }
  
  getUniqueWorkCode(szone) {
    // console.log(szone)
        if (this.Zonelist && szone) {
      this.uniqueWorkcode=[];
      this.uniqueWorkcode = [
        ...new Set(
          this.Zonelist.filter((f) => f.Zone === szone).map(
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
      else{
        this.Form.patchValue({
          workcode: ""
        })
      }
    }
    else{
      this.Form.patchValue({
        workcode: ""
      })
    }
  }
  workcodewiseSearchData: any = [];
  dbResult: any = [];
  onSubmit() {
    let obj = {
      UserId: Number(sessionStorage.getItem("UserId")),
      Zone: (this.Form.value.zone) ? this.Form.value.zone : null,     
      Workcode: (this.Form.value.workcode) ? this.Form.value.workcode : null,
      FromDate: this.Form.value.fromdate,
      ToDate: this.Form.value.todate,
    };
    // console.log(obj)
    if (this.Form.value.fromdate!="" && this.Form.value.fromdate != undefined && this.Form.value.todate!="" && this.Form.value.todate != undefined) {
      if (new Date(this.Form.value.fromdate) > new Date(this.Form.value.todate)) {
        Swal.fire({
          text: ' From Date Must be less than To date',
          icon: 'warning'
        })
      }
      else {
    this.dbCallingService.getWorkcodewiseSearchData(obj).subscribe((res) => {
  
      this.dbResult = res;
      if (this.dbResult.ServiceResponse > 0) {
    
        this.workcodewiseSearchData = res.Data;
        this.workcodewiseSearchData = res.Data;
        let preQty = this.workcodewiseSearchData.reduce((p, c) => p + Number(c.PremonsoonDesiltQuantity), 0).toFixed(2);
        let actNetwt = this.workcodewiseSearchData.reduce((p, c) => p + Number(c.TotalActNetWeight), 0).toFixed(2);
        let prcnt = (actNetwt * 100) / preQty;
        let obttl = {
          "Zone": "",
          "Workcode": "Total",
          "PremonsoonDesiltQuantity": preQty,
          "DuringMonsoonDesiltQuantity": this.workcodewiseSearchData.reduce((p, c) => p + Number(c.DuringMonsoonDesiltQuantity), 0).toFixed(2),
          "AftrMonsoonDesiltQuantity": this.workcodewiseSearchData.reduce((p, c) => p + Number(c.AftrMonsoonDesiltQuantity), 0).toFixed(2),
          "TotalDesiltQuantity": this.workcodewiseSearchData.reduce((p, c) => p + Number(c.TotalDesiltQuantity), 0).toFixed(2),
          "TotalActNetWeight": actNetwt,
          "TotalVehicle": this.workcodewiseSearchData.reduce((p, c) => p + Number(c.TotalVehicle), 0).toFixed(2),
          "PercentOfPremonsoon": prcnt.toFixed(2),
        }
        console.log(this.workcodewiseSearchData)
        console.log(preQty,actNetwt,prcnt)
        this.workcodewiseSearchData.push(obttl);
        if (this.workcodewiseSearchData.length > 0) {
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

  getAGGridReady() {


    this.columnDefs = [
      { headerName: 'Zone', field: 'Zone',maxWidth:100 },
      { headerName: 'Parent code', field: 'Parentcode',maxWidth:100 },
      { headerName: 'Work code', field: 'Workcode' ,maxWidth:100},
      {
        headerName: 'Pre monsoon Desilt Quantity',
        field: 'PremonsoonDesiltQuantity',
        maxWidth:150
      },
      {
        headerName: 'During Monsoon Desilt Quantity',
        field: 'DuringMonsoonDesiltQuantity',
        maxWidth:150
      },
      {
        headerName: 'After Monsoon Desilt Quantity',
        field: 'AftrMonsoonDesiltQuantity',
        maxWidth:150
      },
      { headerName: 'Desilt Quantity', field: 'TotalDesiltQuantity',maxWidth:100 },
      { headerName: 'Total Net Weight', field: 'TotalActNetWeight' ,maxWidth:100},
      { headerName: 'Total Vehicle', field: 'TotalVehicle',maxWidth:100 },
      {
        headerName: '% of (Pre Monsoon Desilt Quantity)',
        field: 'PercentOfPremonsoon',
        maxWidth:100
      },
    ];

    // this.frameworkComponents = {
    //   btnCellRenderer: BtnCellRenderer,
    //   btnLinkCellRenderer: BtnLinkCellRenderer,
    //   btnViewCellRenderer: BtnViewCellRenderer,
    //   btnMoreCellRenderer: BtnMoreCellRenderer,

    // };

    this.context = { componentParent: this };

    this.defaultColDef = {
      sortable: true,
      // flex: 1,
      minWidth: 60,
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

  back() {
    this.router.navigateByUrl('/dashboard');
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

  fileName = 'WorkCodewiseReportSheet.xlsx';
  lstWorkCodewiseExportData: any = [];

  lstworkcodePdfdata:any =[];
  fromDate: any;
  toDate: any;

  export(type) {

    let obj = {
      UserId: Number(sessionStorage.getItem("UserId")),
      Zone: (this.Form.value.zone) ? this.Form.value.zone : null,     
      Workcode: (this.Form.value.workcode) ? this.Form.value.workcode : null,
      FromDate: this.Form.value.fromdate,
      ToDate: this.Form.value.todate,
    };

    this.fromDate = obj.FromDate;
    this.toDate = obj.ToDate;
    if (this.Form.value.fromdate != undefined && this.Form.value.todate != undefined) {
      if (new Date(this.Form.value.fromdate) > new Date(this.Form.value.todate)) {
        Swal.fire({
          text: ' From Date Must be less than To date',
          icon: 'warning'
        })
      }
      else {
    this.dbCallingService.getWorkcodewiseSearchData(obj).subscribe((res) => {
  
      this.dbResult = res;
      if (this.dbResult.ServiceResponse > 0) {
        this.lstWorkCodewiseExportData = res.Data;
        let preQty = this.lstWorkCodewiseExportData.reduce((p, c) => p + Number(c.PremonsoonDesiltQuantity), 0).toFixed(2);
        let actNetwt = this.lstWorkCodewiseExportData.reduce((p, c) => p + Number(c.TotalActNetWeight), 0).toFixed(2);
        let prcnt = (actNetwt * 100) / preQty;
        let obttl = {
          "Zone": "",
          "Workcode": "Total",
          "PremonsoonDesiltQuantity": preQty,
          "DuringMonsoonDesiltQuantity": this.lstWorkCodewiseExportData.reduce((p, c) => p + Number(c.DuringMonsoonDesiltQuantity), 0).toFixed(2),
          "AftrMonsoonDesiltQuantity": this.lstWorkCodewiseExportData.reduce((p, c) => p + Number(c.AftrMonsoonDesiltQuantity), 0).toFixed(2),
          "TotalDesiltQuantity": this.lstWorkCodewiseExportData.reduce((p, c) => p + Number(c.TotalDesiltQuantity), 0).toFixed(2),
          "TotalActNetWeight": actNetwt,
          "TotalVehicle": this.lstWorkCodewiseExportData.reduce((p, c) => p + Number(c.TotalVehicle), 0),
          "PercentOfPremonsoon": prcnt.toFixed(2),
        }
        this.lstWorkCodewiseExportData.push(obttl);
        console.log(preQty,actNetwt,prcnt)

        if (this.lstWorkCodewiseExportData.length > 0) {
          if (type == 'excel') {
            this.exportToExcel();
          } 
          else {
        
            this.exportToPdf();
          }
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

  exportToExcel() {
    let element = document.getElementById('WorkCodeExportTable');
    /* pass here the table id */
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  tableheaders = [];
  tableContent = [];
  column: any = [];



  public exportToPdf(): void {
    
    const fileName = 'WorkCodeWiseReport_'+moment(new Date()).format('DDMMYYYY')

    var docDefinition = {
      content: [
        {
          table: {
            widths: [100, "*", 100],
            header: "center",
            body: [
              [{ rowSpan: 2, image: CustomVFS.eps95logo, fit: [80, 80], alignment: "center" },
              { text: 'BRIHANMUMBAI MUNICIPAL CORPORATION', alignment: "center", fontSize: '13', bold: 'true' },
              { rowSpan: 2, text: 'SWD De-Silting', alignment: "center" }],
              ['', { text: 'Workcode-Wise report of Desilting From Date '+moment(this.Form.value.fromdate).format("DD-MMM-yyyy")+" To " +moment(this.Form.value.todate).format("DD-MMM-yyyy"), alignment: "center" }, ''],

            ],
            alignment: 'center',
          },
          pageSize: "A4",
          pageOrientation: "landscape",
        },

        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*"],
            body: [
              [
                "Zone",
                "Work code",
                "Premonsoon Desilt Quantity",
                "During Monsoon Desilt Quantity",
                "After Monsoon Desilt Quantity",
                "Desilt Quantity",
                "Total Net Weight",
                "Total Vehicle",
                "% of (Pre Monsoon Desilt Quantity)",
              ],
              ...this.lstWorkCodewiseExportData.map((p) => [
                p.Zone,
                p.Workcode,
                p.PremonsoonDesiltQuantity,
                p.DuringMonsoonDesiltQuantity,
                p.AftrMonsoonDesiltQuantity,
                p.TotalDesiltQuantity,
                p.TotalActNetWeight,
                p.TotalVehicle,
                p.PercentOfPremonsoon
              ]),
            ],
          },
          
        },
      ],

      styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: "center",

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
          color: "black",
          alignment: "center",

          fontSize: 8,
        },
        footnote: {
          fontSize: 6,
          margin: [0, 1, 0, 0],
        },
      },
      
      pageSize: 'A3',
      
    };
    pdfMake.createPdf(docDefinition).download(fileName + '.pdf');
  }

  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        widths: columns.forEach((element) => '*'),
        // body: this.dbCallingService.buildTableBody(data, columns)
      },
    };
  }
 
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

// function dateComparator(date1, date2) {
//   var date1Number = _monthToNum(date1);
//   var date2Number = _monthToNum(date2);

//   if (date1Number === null && date2Number === null) {
//     return 0;
//   }
//   if (date1Number === null) {
//     return -1;
//   }
//   if (date2Number === null) {
//     return 1;
//   }

//   return date1Number - date2Number;
// }
// // HELPER FOR DATE COMPARISON
// function _monthToNum(date) {
//   if (date === undefined || date === null || date.length !== 10) {
//     return null;
//   }

//   var yearNumber = date.substring(6, 10);
//   var monthNumber = date.substring(3, 5);
//   var dayNumber = date.substring(0, 2);

//   var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
//   // 29/08/2004 => 20040829
//   return result;
// }
