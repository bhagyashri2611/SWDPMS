import { AgGridAngular } from 'ag-grid-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModuleModel } from 'src/app/core/models/IModule';
import { ModuleService } from 'src/app/core/services/module.service';
import { BtnCellRenderer } from './button-cell-renderer.component';
import { CommonService } from 'src/app/core/services/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modulelist',
  templateUrl: './modulelist.component.html',
  styleUrls: ['./modulelist.component.scss'],
})
export class ModulelistComponent implements OnInit {
  moduleList: ModuleModel[];

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
    private moduleService: ModuleService
  ) {}
  gridOptions = {
    rowHeight: 40,
    getRowHeight: function (params) {
      return 40;
    },
  };
  ngOnInit(): void {
    this.getModules();
    this.columnDefs = [
      {
        headerName: 'Action',
        field: '_id',
        cellRenderer: 'btnCellRenderer',
      },
      { headerName: '_id', field: '_id', hide: true },
      {
        headerName: 'Task Name',
        field: 'moduleName',
      },
      { headerName: 'Description', field: 'description' },
      { headerName: 'Priority', field: 'priority' },
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

  getModules() {
    this.moduleService.getModules().subscribe(
      (result) => {
        if (result.status === 200) {
          this.moduleList = result.data;
          this.rowData = result.data;
        }
      },
      (err) => {
        Swal.fire({
          text: err,
          icon: 'error',
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

  onQuickFilterChanged() {
    let val = (<HTMLInputElement>document.getElementById('quickFilter')).value;
    this.agGrid.api.setQuickFilter(val);
  }
  selectAllAmerican() {
    //this.agGrid.api.forEachNode(function (node) {
    // if(node.data._id==="5f5fb46efe0da740ae7c0e49" || node.data._id==="5f5f62c48d7da32bbc05dca2"){
    // node.setSelected(true);
    // }
    //});
    // const selectedNode = this.agGrid.api.getSelectedNodes();
    // const selectedData = selectedNode.map(node => node.data)
    // console.log(selectedData);
    // const selectedDataStringPresentation = selectedData.map(node => node.locationName + ' ' + node._id).join(', ');
    //  alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
  methodFromParent(cell) {
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
    this.router.navigate(['module/create']);
  }
}
