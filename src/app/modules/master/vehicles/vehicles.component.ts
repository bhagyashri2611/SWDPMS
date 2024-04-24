import { Component, OnInit } from '@angular/core';
import { DbCallingService } from 'src/app/core/services/db-calling.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  rowData: any = [];

  columnDefs;
  context;
  gridApi;
  gridColumnApi;
  defaultColDef;
  rowSelection;
  frameworkComponents;

  constructor(private dbCallingService: DbCallingService) {}

  ngOnInit() {
    var data = { };
    this.dbCallingService.getVehiclesData(data).subscribe((res) => {
      debugger;
      this.rowData = res.VehicleData;
      console.log('Vehicle List ', this.rowData);
      if(this.rowData.length > 0) {
        this.getAGGridReady();
      }
    });
  }

  getAGGridReady() {
    this.columnDefs = [
      { headerName: 'Vehicle ID', field: 'Veh_ID' },
      { headerName: 'Vehicle Num', field: 'Veh_Num', },
      { headerName: 'Vehicle Type', field: 'VehicleType', },
      { headerName: 'Work Code', field: 'Work_code', },
      { headerName: 'Parent Code', field: 'Parentcode', },
      {
        headerName: 'IsVehicleActive',
        field: 'IsVehicleActive',
        minWidth: 200,
        valueFormatter: function (params) {
          console.log(params);
          return params.value === 1 ? 'Yes' : 'No';
        },
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
