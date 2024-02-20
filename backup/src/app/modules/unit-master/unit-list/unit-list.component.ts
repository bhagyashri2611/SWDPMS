import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BtnCellRenderer } from './button-cell-renderer.component';
import { UnitModulesService } from 'src/app/core/services/unit-modules.service';
import { UnitModel } from 'src/app/core/models/IUnit';
// import { DialogService } from "src/app/shared/mat-confirm-dialog/dialog.service";
// import { NotificationService } from "src/app/shared/notification.service";
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss'],
})
export class UnitListComponent implements OnInit {
  unitList: UnitModel[];

  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  gridApi;
  gridColumnApi;
  sortingOrder;
  rowSelection;
  columnDefs;
  frameworkComponents;
  context;
  defaultColDef;
  selectedRows;
  selected;
  gridOption;
  rowData: any;
  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private unitService: UnitModulesService // private dialogService: DialogService, // private notificationService: NotificationService
  ) {}

  gridOptions = {
    // other grid options
    rowHeight: 40, // Set the desired row height (in pixels)
    getRowHeight: function (params) {
      // Optional: Customize row height per row, if needed
      return 40; // Return the desired row height (in pixels)
    },
  };

  ngOnInit(): void {
    this.getUnits();
    this.columnDefs = [
      {
        headerName: 'Action',
        field: '_id',
        cellRenderer: 'btnCellRenderer',
      },
      { headerName: '_id', field: '_id', hide: true },
      {
        headerName: 'Unit Name',
        field: 'unitName',
      },
      { headerName: 'Description', field: 'description' },
      { headerName: 'Type', field: 'type' },

      {
        headerName: 'Created On',
        field: 'createdOn',
        valueGetter: this.commonService.createdOnDateFormatter,
      },
      { headerName: 'Created By', field: 'createdBy' },
    ];
    this.rowSelection = 'multiple';
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
    };
    this.context = { componentParent: this };

    this.defaultColDef = {
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
      sortingOrder: ['asc', 'desc'],
    };
  }
  ngAfterViewInit() {
    this.selectAllAmerican();
  }

  getUnits() {
    console.log('calling  unit List');
    this.unitService.getUnits().subscribe(
      (result) => {
        console.log(result);
        if (result.status === 200) {
          this.unitList = result.data;
          this.rowData = result.data;
        }
      },
      (err) => {
        // this.notificationService.warn(':: ' + err);
      }
    );
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultColDef = params.defaultColDef;
    this.context = params.context;
  }

  onQuickFilterChanged() {
    let val = (<HTMLInputElement>document.getElementById('quickFilter')).value;
    console.log(val);
    this.agGrid.api.setQuickFilter(val);
  }
  selectAllAmerican() {
    this.agGrid.api.forEachNode(function (node) {
      if (
        node.data._id === '5f5fb46efe0da740ae7c0e49' ||
        node.data._id === '5f5f62c48d7da32bbc05dca2'
      ) {
        node.setSelected(true);
      }
    });
  }
  methodFromParent(cell) {
    console.log(cell);
    alert('Parent Component Method from ' + cell.id + '!');
  }

  setRowData(params) {
    params.api.forEachNode(function (node) {
      if (
        node.data._id === '5f5fb46efe0da740ae7c0e49' ||
        node.data._id === '5f5f62c48d7da32bbc05dca2'
      ) {
        node.setSelected(true);
      }
    });
  }
  Add() {
    this.router.navigate(['unit/create']);
  }
}
