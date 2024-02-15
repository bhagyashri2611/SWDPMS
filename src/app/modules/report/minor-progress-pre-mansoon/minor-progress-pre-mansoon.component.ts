import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/models/loginModel';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import { ReportsModel } from '../../../core/models/reportsModel';
import { AgGridAngular } from '@ag-grid-community/angular';

//import { BtnCellRenderer } from './button-cell-renderer.component';
//import { BtnLinkCellRenderer } from './buttonLink-cell-renderer.component';
//import { BtnViewCellRenderer } from './buttonView-cell-renderer.component';
//import { BtnMoreCellRenderer } from './buttonMore-cell-renderer.component';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { CustomVFS } from 'src/app/core/services/pdfmakefonts';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
//(pdfMake as any).vfs = (CustomVFS as any).myVfs;
/*(pdfMake as any).fonts = {
  Noto: {
  normal: "noto-sans-regular.woff",
    bold: "noto-sans-700.woff"
  }
};*/
//var pdfMake = require('./pdfmake');
//var pdfFonts = require('./vfs_fonts');

//pdfMake.addVirtualFileSystem(pdfFonts);


@Component({
  selector: 'app-minor-progress-pre-mansoon',
  templateUrl: './minor-progress-pre-mansoon.component.html',
  styleUrls: ['./minor-progress-pre-mansoon.component.scss']
})

export class MinorProgressPreMansoonComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private dbCallingService: DbCallingService
  ) { }

  reportmodel: ReportsModel;
  reportsSearchForm: FormGroup;

  lstMinorResults: any = [];
  rowList: any = []
  dropdownData: any = [];
  AgencyData: any = [];
  GarbageData: any = [];
  NallahData: any = [];
  ShiftData: any = [];
  WeighBridgeData: any = [];
  VehcleData: any = [];
  WardData: any = [];
  WorkCodeData: any = [];
  listminor: any = [];
  column: any = [];
  rowContent = [];
  tableheaders = [];
  tableContent = [];
  pagesize = 10;
  PageNumber = 1;

  columnDefs;
  context;
  gridApi;
  gridColumnApi;
  defaultColDef;
  rowSelection;
  frameworkComponents;
  fileName = 'MinorNallahPreMonsoonProgressReport.xlsx';


  ngOnInit() {
    //debugger;
    let obj = {
      UserId: Number(sessionStorage.getItem("UserID")),
      ZoneRegion: 'Pre'
    }
    this.dbCallingService.getMinorNallPreMonsoonProgressData(obj).subscribe(
      (result) => {

        this.lstMinorResults = result;
        this.listminor = this.lstMinorResults.Data;
        let PreQuantity= Number(this.listminor.reduce((p,c)=>p+Number(c.TotalPremonsoonDesiltQuantity),0) )
        let actNetwt=this.listminor.reduce((p,c)=>p+Number(c.ActNetWtQuantity),0)
        let BillableActWt=this.listminor.reduce((p,c)=>p+Number(c.BillableNetWt),0) 
        let prcnt = (actNetwt*100)/PreQuantity;
        let bprcnt = (BillableActWt*100)/PreQuantity;
        let eachRec = {
            "Area": "",
            "Zonne": "Total",
            "Ward":"",
            "workcode":"",           
            "TotalPremonsoonDesiltQuantity":PreQuantity.toFixed(2) ,
            "DuringMonsoonDesiltQuantity": this.listminor.reduce((p,c)=>p+Number(c.DuringMonsoonDesiltQuantity),0).toFixed(2),
            "TotalAftermonsoonDesiltQuantity":"",
            "TotalDesiltQuantity":this.listminor.reduce((p,c)=>p+Number(c.TotalDesiltQuantity),0).toFixed(2),
            "VehCount": this.listminor.reduce((p,c)=>p+Number(c.VehCount),0).toFixed(2),
            "ActNetWtQuantity": actNetwt.toFixed(2),
            "PercentPreMonsoon": prcnt.toFixed(2),
            "BillableNetWt": BillableActWt.toFixed(2),
            "BillablePrcnt": bprcnt.toFixed(2),
          }
          this.listminor.push(eachRec);
          console.log(this.lstMinorResults.Data)
        console.log("result",PreQuantity,actNetwt,BillableActWt,prcnt,bprcnt,this.listminor);

        if (this.listminor.length > 0) {
          this.getAGGridReady();
        }
      },
      (err) => console.log(err)
    );


  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultColDef = params.defaultColDef;
    this.context = params.context;
    //this.rowData=params.rowData;
  }
  headerHeightSetter(params) {
    var padding = 20;
    var height = headerHeightGetter() + padding;
    this.gridApi.setHeaderHeight(height);
    this.gridApi.resetRowHeights();
  }
  getAGGridReady() {
    this.columnDefs = [
      { headerName: 'Area', field: 'Area'},
      { headerName: 'Zone', field: 'Zonne', cellStyle: { 'font-weight': 'bold' } },
      { headerName: 'Ward', field: 'Ward' },
      { headerName: 'Workcode', field: 'workcode'},      
      { headerName: 'Pre monsoon Quantity', field: 'TotalPremonsoonDesiltQuantity' },
      { headerName: 'During Monsoon Quantity', field: 'TotalAftermonsoonDesiltQuantity', },
      { headerName: 'Total Silt Quantity', field: 'TotalDesiltQuantity'},
      { headerName: 'Total Vehicle', field: 'VehCount', },
      { headerName: 'Total Net Weight (MT)', field: 'ActNetWtQuantity', },
      { headerName: '% of completion', field: 'PercentPreMonsoon', },
      { headerName: 'Total Billable Net Weight (MT)', field: 'BillableNetWt', },
      { headerName: '% of completion (billable)', field: 'BillablePrcnt', },
    ];

    /* this.frameworkComponents = {
       btnCellRenderer: BtnCellRenderer,
       btnLinkCellRenderer: BtnLinkCellRenderer,
       btnViewCellRenderer: BtnViewCellRenderer,
       btnMoreCellRenderer: BtnMoreCellRenderer,
 
     };*/

    this.context = { componentParent: this };

    this.defaultColDef = {
      sortable: true,
      // flex: 1,
      maxWidth: 100,
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

  exportToExcel() {
    //debugger;
    if (this.listminor.length > 0) {
      let element = document.getElementById('excelexporttable');
      /* pass here the table id */
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    }
    else {
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
        widths: columns.forEach(element => 'auto'),
        body: this.dbCallingService.buildTableBody(data, columns)
      }
    };
  }
  download() {
    const fileName = "MinorNallaPreMonsoonProgress_"+moment(new Date()).format('DDMMYYYY')
    const recordList = [];
    this.listminor.forEach(rec => {
      let eachRec = {
        "Area": rec.Area,
        "Zone": rec.Zonne,
        "Ward": rec.Ward,
        "Workcode": rec.workcode,       
        "Pre monsoon Quantity": rec.TotalPremonsoonDesiltQuantity,
        "During Monsoon Quantity": rec.TotalAftermonsoonDesiltQuantity,
        "Total Silt Quantity": rec.TotalDesiltQuantity,
        "Total Vehicle": rec.VehCount,
        "Total Net Weight (MT)": rec.ActNetWtQuantity,
        "% of completion": rec.PercentPreMonsoon,
        "Total Billable Net Weight (MT)": rec.BillableNetWt,
        "% of completion (billable)": rec.BillablePrcnt,
      }
      recordList.push(eachRec);

    });
    var docDefinition = {
      footer: function (currentPage, pageCount) { return currentPage.toString() + ' of ' + pageCount; },
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
            widths: [100, "*", 100],
            header: "center",
            body: [
              [{ rowSpan: 2, image: CustomVFS.eps95logo, fit: [80, 80], alignment: "center" },
              { text: 'BRIHANMUMBAI MUNICIPAL CORPORATION', alignment: "center", fontSize: '13', bold: 'true' },
              { rowSpan: 2, text: 'SWD De-Silting', alignment: "center" }],
              ['', { text: 'Pre-Monsoom Progress report of De-Silting', alignment: "center" }, ''],

            ],
            alignment: 'center',
          },
          pageSize: "A4",
          pageOrientation: "landscape",
        },
        // { text: this.hedLocation + '|'  + this.hedFromDate ,alignment:'left' },
        // {
        //   table: {
        //     headerRows: 1,
        //     widths: ['*', '*', '*'],
        //     body: [[{ text: 'Year', alignment: "center", bold: 'true' },{ text:'Dry Weather' , alignment: "center", bold: 'true' },{ text: 'Wet Weather', alignment: "center", bold: 'true' }]]
        //   }
        // },
        this.table(recordList, Object.keys(recordList[0]))
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: "center",

          lineHeight: 1.25
        },
        subheader: {
          fontSize: 8
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 6
        },
        block: {
          margins: [0, 5]
        },
        tableHeader: {
          bold: true,
          color: "black",
          alignment: "center",

          fontSize: 8
        },
        footnote: {
          fontSize: 6,
          margin: [0, 1, 0, 0]
        }
      },
      pageSize: "A4",
      pageOrientation: "landscape",
      defaultStyle: {
        //font: "Noto",
        fontSize: 10,
        alignment: "center",
        lineHeight: 1.25
      },
      preserveSpace: {
        preserveLeadingSpaces: true
      }
    };
    pdfMake.createPdf(docDefinition).download(fileName + ".pdf");
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