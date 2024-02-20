import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AgGridAngular } from '@ag-grid-community/angular';
import { DbCallingService } from 'src/app/core/services/db-calling.service';

@Component({
  selector: 'app-slit-qualitity',
  templateUrl: './slit-qualitity.component.html',
  styleUrls: ['./slit-qualitity.component.scss']
})
export class SlitQualitityComponent {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  lstSearchResults:any = [];
  lstReportData:any =[];
  pagesize = 10;
  PageNumber = 1;


  listminor: any = [];
  lstMinorResults: any = [];

  columnDefs;
  context;
  gridApi;
  gridColumnApi;
  defaultColDef;
  rowSelection;
  frameworkComponents;
  
  constructor( private dbCallingService: DbCallingService,
    private router: Router
  ) {
  }


  ngOnInit() {
    let obj = {
      UserId: Number(sessionStorage.getItem("UserId")),
    
    }
    this.dbCallingService.getSiltQuantityData(obj).subscribe(
      (res) => {    
      if(res.ServiceResponse===1)   {
        if (res.Data) {      
          this.listminor=res.Data;
          if(this.listminor.length>0){
            this.getAGGridReady();
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

  getAGGridReady() {
    this.columnDefs = [
      { headerName: 'Nalla ID', field: 'SiltQuantityID', maxWidth:70 },
      { headerName: 'Zone', field: 'Zone', maxWidth:70 },
      { headerName: 'Parentcode', field: 'Parentcode', maxWidth:70 },
      { headerName: 'Workcode', field: 'Workcode', maxWidth:70 },
      { headerName: 'Ward', field: 'Ward',maxWidth:70 },    
      { headerName: 'Nallah No', field: 'NallahNo',  maxWidth:100 },    
      { headerName: 'Catchment Number', field: 'CatchmentNumber',  maxWidth:100},
      { headerName: 'Nallah System', field: 'NallahSystem',  maxWidth:150},
      { headerName: 'Nallah Length', field: 'NallahLength',  maxWidth:100},
      { headerName: 'Avg Width', field: 'AvgWidth',maxWidth:100},
      { headerName: 'Pre-monsoon Desilt Quantity', field: 'PremonsoonDesiltQuantity',maxWidth:100  },
      { headerName: 'During-Monsoon Desilt Quantity', field: 'DuringMonsoonDesiltQuantity', maxWidth:100 },
      { headerName: 'After-Monsoon Desilt Quantity', field: 'AftrMonsoonDesiltQuantity', maxWidth:100 },     
      { headerName: 'Total Desilt Quantity', field: 'TotalDesiltQuantity', maxWidth:100 }, 
   
    ];

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

  onSubmit() {
    let obj={
      UserId:Number(sessionStorage.getItem("UserId")),
    
    }  
    console.log(obj);
   this.dbCallingService.getSiltQuantityData(obj).subscribe(
    (res) => {    
    if(res.ServiceResponse===1)   {
      if (res.Data) {      
        this.lstReportData=res.Data;
        if(this.lstReportData.length>0){
          this.getAGGridReady();
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