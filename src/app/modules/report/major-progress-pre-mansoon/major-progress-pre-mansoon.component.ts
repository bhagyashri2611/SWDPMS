import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AgGridAngular } from '@ag-grid-community/angular';
import { DbCallingService } from 'src/app/core/services/db-calling.service';

//import { BtnCellRenderer } from './button-cell-renderer.component';
//import { BtnLinkCellRenderer } from './buttonLink-cell-renderer.component';
//import { BtnViewCellRenderer } from './buttonView-cell-renderer.component';
//import { BtnMoreCellRenderer } from './buttonMore-cell-renderer.component';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { CustomVFS } from 'src/app/core/services/pdfmakefonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-major-progress-pre-mansoon',
  templateUrl: './major-progress-pre-mansoon.component.html',
  styleUrls: ['./major-progress-pre-mansoon.component.scss']
})
export class MajorProgressPreMansoonComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  lstSearchResults:any = [];
  lstReportData:any =[];
  pagesize = 10;
  PageNumber = 1;

  columnDefs;
  context;
  gridApi;
  gridColumnApi;
  defaultColDef;
  rowSelection;
  frameworkComponents;
  fileName = 'MajorNallahPreMonsoonProgressReport.xlsx';
  constructor( private dbCallingService: DbCallingService,
    private router: Router
  ) {
  }

  ngOnInit() {
        
        this.onSubmit();
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
    let obj={
      UserId:Number(sessionStorage.getItem("UserId")),
      Zone:null,
      Parentcode:null,
      Workcode:null,
      SiltQuantityID:null,
      FromDate:"2023-03-01",
      ToDate:"2023-05-31",
    }  
    console.log(obj);
   this.dbCallingService.getMajorNallCumulativeProgressData(obj).subscribe((res) => {
    
    if(res.ServiceResponse===1)   {
      if (res.Data) {      
        this.lstReportData=res.Data;
        console.log(this.lstReportData)
        let PreQuantity=this.lstReportData.reduce((p,c)=>p+Number(c.PremonsoonDesiltQuantity),0) 
        let actNetwt=this.lstReportData.reduce((p,c)=>p+Number(c.TotalActNetWeight),0)
        let BillableActWt=this.lstReportData.reduce((p,c)=>p+Number(c.BillableQuantity),0) 
        let prcnt = (actNetwt*100)/PreQuantity;
        let bprcnt = (BillableActWt*100)/PreQuantity;
        let eachRec = {
          "NallaID":0,
          "Zone":"Total",
          "Ward": "",
          "ExecutiveEngg": "",
          "CatchmentNumber": "",
          "NallahNo": "",
          "NallahSystem": "",
          "NallahLength":this.lstReportData.reduce((p,c)=>p+Number(c.NallahLength),0).toFixed(2) ,
          "AvgWidth":"",
          "PremonsoonDesiltQuantity":(this.lstReportData.reduce((p,c)=>p+Number(c.PremonsoonDesiltQuantity),0)).toFixed(2) ,
          "DuringMonsoonDesiltQuantity": this.lstReportData.reduce((p,c)=>p+Number(c.DuringMonsoonDesiltQuantity),0).toFixed(2) ,  
          "AftrMonsoonDesiltQuantity": this.lstReportData.reduce((p,c)=>p+Number(c.AftrMonsoonDesiltQuantity),0).toFixed(2) ,   
          "TotalDesiltQuantity": this.lstReportData.reduce((p,c)=>p+Number(c.TotalDesiltQuantity),0).toFixed(2) ,     
          "TotalVehicle":this.lstReportData.reduce((p,c)=>p+Number(c.TotalVehicle),0).toFixed(2) ,
          "TotalActNetWeight":actNetwt.toFixed(2) ,
          "PercentOfPremonsoon": prcnt.toFixed(2), 
          "BillableQuantity": BillableActWt.toFixed(2) ,
          "BillablePercent":bprcnt.toFixed(2), 
        }
        this.lstReportData.push(eachRec)
        if(this.lstReportData.length>0){
            this.getAGGridReady()
        }
      }
      else {
        Swal.fire({
          text: 'No Record Found !',
          icon: 'warning'
        });
      }
    }  
    else {
      Swal.fire({
        text: res.Msg,
        icon: 'warning'
      });
    }
  },
  (err)=>{
    Swal.fire({
      text: err,
      icon: 'warning'
    });
  }
  );
  }
  back(){
    this.router.navigateByUrl('/dashboard');
  }
  getAGGridReady() {      

    this.columnDefs = [
      { headerName: 'Nalla ID', field: 'SiltQuantityID',  maxWidth:80},     
      { headerName: 'Zone', field: 'Zone' ,maxWidth:70},
      { headerName: 'Ward', field: 'Ward',maxWidth:70 },    
      { headerName: 'Nallah No', field: 'NallahNo', cellStyle: { 'font-weight': 'bold' },  maxWidth:70 },  
      { headerName: 'Executive Engg', field: 'ExecutiveEngg',maxWidth:70 },  
      { headerName: 'Catchment Number', field: 'CatchmentNumber',  maxWidth:150},
      { headerName: 'Nallah System', field: 'NallahSystem',  maxWidth:200},
      { headerName: 'Nallah Length', field: 'NallahLength',  maxWidth:100},
      { headerName: 'Avg Width', field: 'AvgWidth',maxWidth:80},
      { headerName: 'Pre monsoon Desilt Quantity', field: 'PremonsoonDesiltQuantity',maxWidth:100  },
      { headerName: 'During Monsoon Desilt Quantity', field: 'DuringMonsoonDesiltQuantity', maxWidth:100 },
      { headerName: 'After Monsoon Desilt Quantity', field: 'AftrMonsoonDesiltQuantity', maxWidth:100 },     
      { headerName: 'Total Desilt Quantity', field: 'TotalDesiltQuantity', maxWidth:100 },
      { headerName: 'Total Vehicle', field: 'TotalVehicle', maxWidth:100 },
      { headerName: 'Total Net Weight (MT)', field: 'TotalActNetWeight',maxWidth:100  },
      { headerName: '% of completion', field: 'PercentOfPremonsoon',maxWidth:100  },   
      { headerName: 'Total Net Weight', field: 'BillableQuantity', maxWidth:100 },
      { headerName: '% of completion (Billable) (MT)', field: 'BillablePercent', maxWidth:100 },
     
    ];

    // this.frameworkComponents = {
    // };

    this.context = { componentParent: this };

    this.defaultColDef = {
      sortable: true,
      minWidth: 50,
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
    if (this.lstReportData.length > 0) {
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
        widths:[10,30,30,50,30,30,50,30,30,40,40,40,40,30,30,30,30,30],
        body: this.dbCallingService.buildTableBody(data, columns)
      }
    };
  }
  download() {
    const fileName = "MajorNallaPreMonsoonProgressReport_"+moment(new Date()).format('DDMMYYYY');
    const recordList = [];
    this.lstReportData.forEach(rec => {
      let eachRec = {
        "Nalla ID": rec.SiltQuantityID?rec.SiltQuantityID:'',
        "Zone": rec.Zone,
        "Ward": rec.Ward,
        "Executive Engg":rec.ExecutiveEngg?rec.ExecutiveEngg:'',
        "Catchment Number": rec.CatchmentNumber,
        "Nallah No": rec.NallahNo,
        "Nallah System": rec.NallahSystem,
        "Nallah Length": rec.NallahLength,
        "Avg Width": rec.AvgWidth,
        "Pre monsoon Desilt Quantity": rec.PremonsoonDesiltQuantity,
        "During Monsoon Desilt Quantity": rec.DuringMonsoonDesiltQuantity,  
        "After Monsoon Desilt Quantity": rec.AftrMonsoonDesiltQuantity,    
        "Total Desilt Quantity": rec.TotalDesiltQuantity,      
        "Total Vehicle": rec.TotalVehicle,
        "Total Net Weight (MT)": rec.TotalActNetWeight,
        "% of completion": rec.PercentOfPremonsoon,
        "Total Billable Net Weight (MT)": rec.BillableQuantity,
        "% of completion (billable)": rec.BillablePercent,
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
              ['', { text: 'Pre-Monsoon Progress report of De-silting till date', alignment: "center" }, ''],

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
          fontSize: 5
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
        fontSize: 9,
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