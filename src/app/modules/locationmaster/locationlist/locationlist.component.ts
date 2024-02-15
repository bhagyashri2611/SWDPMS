import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ILocationResponse,
  LocationModel,
} from 'src/app/core/models/ILocation';
import { CommonService } from 'src/app/core/services/common.service';
import { LocationService } from 'src/app/core/services/location.service';
import { BtnCellRenderer } from './button-cell-renderer.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-locationlist',
  templateUrl: './locationlist.component.html',
  styleUrls: ['./locationlist.component.scss'],
})
export class LocationlistComponent implements OnInit {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  locationForm: FormGroup;
  locationResponce: ILocationResponse;
  locationList: LocationModel[];
  objLocation: LocationModel;
  pageTitle: 'Create';
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
  rowData: any;
  gridOption;

  gridOptions = {
    rowHeight: 40,
    getRowHeight: function (params) {
      return 40;
    },
  };

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.getLocation();
    this.columnDefs = [
      {
        headerName: 'Action',
        field: '_id',
        cellRenderer: 'btnCellRenderer',
      },
      { headerName: '_id', field: '_id', hide: true },
      { headerName: 'Work Code', field: 'workCode' },
      {
        headerName: 'Location Name',
        field: 'locationName',
      },
      { headerName: 'Ward Name', field: 'wardName.wardName' },
      { headerName: 'Zone Name', field: 'zoneName' },
      {
        headerName: 'Contractor Name',
        field: 'contractorName',
      },
      {
        headerName: 'Start Date',
        field: 'starteDate',
        valueGetter: this.commonService.createdOnDateFormatter,
      },
    ];
    this.rowSelection = 'multiple';
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
    };
    this.context = { componentParent: this };

    this.defaultColDef = {
      sortable: true,
      flex: 1,
      filter: true,
      resizable: true,
      wrapText: true,
      autoHeight: true,
      sortingOrder: ['asc', 'desc'],
      enableRowSelection: true,
      enableFullRowSelection: true,
      enableHighlighting: true,
      enableCellTextSelection: true,
    };
  }
  ngAfterViewInit() {
    this.selectAllAmerican();
  }
  getLocation() {
    this.locationService.getLocations().subscribe(
      (result) => {
        if (result.status === 200) {
          this.locationList = result.data;
          this.rowData = this.locationList;
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
    this.router.navigate(['location/create']);
  }
}
