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
        minWidth: 180,
      },
      { headerName: '_id', field: '_id', hide: true },
      //  { headerName: 'locationID', field: 'locationID' },
      { headerName: 'Ward Name', field: 'wardName.wardName'},
      { headerName: 'Zone Name', field: 'zoneName' },
      { headerName: 'Work Code', field: 'workCode' },
      {
        headerName: 'Location Name',
        field: 'locationName',
        minWidth: 150,
        // headerCheckboxSelection: true,
        // headerCheckboxSelectionFilteredOnly: true,
        // checkboxSelection: true,
      },
      { headerName: 'Length (m)', field: 'length' },
      { headerName: 'Width (m)', field: 'width' },
      { headerName: 'Contractor Name', field: 'contractorName', minWidth: 180  },
      { headerName: 'Status', field: 'status',  cellStyle: this.getCellStyle.bind(this) },      
      { headerName: 'Start Date', field: 'startDate',valueGetter: (params) => {
        return this.commonService.DateFormatter(params.data.startDate);
      }, },
      { headerName: 'End Date', field: 'endDate',valueGetter: (params) => {
        return this.commonService.DateFormatter(params.data.endDate);
      }, },
      {
        headerName: 'Q1 End Date',
        field: 'quater1EndDate',
        valueGetter: (params) => {
          return this.commonService.DateFormatter(params.data.quater1EndDate);
        },
      },
      {
        headerName: 'Q2 End Date',
        field: 'quater2EndDate',
        valueGetter: (params) => {
          return this.commonService.DateFormatter(params.data.quater2EndDate);
        },
      },
      {
        headerName: 'Q3 End Date',
        field: 'quater3EndDate',
        valueGetter: (params) => {
          return this.commonService.DateFormatter(params.data.quater3EndDate);
        },
      },
      {
        headerName: 'Q4 End Date',
        field: 'quater4EndDate',
        valueGetter: (params) => {
          return this.commonService.DateFormatter(params.data.quater4EndDate);
        },
      },
      {
        headerName: 'Q5 End Date',
        field: 'quater5EndDate',
        valueGetter: (params) => {
          return this.commonService.DateFormatter(params.data.quater5EndDate);
        },
      },
      { headerName: 'Remarks', field: 'description',minWidth:200 },

      // { headerName: 'Is Automated', field: 'isAutomated', valueGetter: this.commonService.isAutomatedValueGetter },
      // { headerName: 'Is Active', field: 'isActive',valueGetter:  this.commonService.isActiveValueGetter },
      {
        headerName: 'Created On',
        field: 'createdOn',
        valueGetter: this.commonService.createdOnDateFormatter,
      },
      { headerName: 'Created By', field: 'createdBy' },
    ];
    debugger
    this.rowSelection = 'multiple';
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer,
    };
    this.context = { componentParent: this };

    this.defaultColDef = {
      sortable: true,
      flex: 1,
      minWidth: 120,
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
  userRole=sessionStorage.getItem("UserRole")

  getLocation() {

    if(this.userRole==='Data Owner')
    {
      this.locationService.getLocations().subscribe((result) => {
        debugger;
        if(result != null) {
          if (result.status === 200) {
            this.locationList = result.data;
            this.locationList=this.locationList.sort((a, b) => (String(a.locationName)).localeCompare(String(b.locationName)));

            debugger;
            this.rowData = this.locationList;
          }
        }
        else {
          Swal.fire({
            title: 'Seesion Expired',
            text: 'Login Again to Continue',
            icon: 'warning',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.value) {
              debugger;
              this.logOut();
            }
          });
        }
          
        },
        (err) => {
          Swal.fire({
            text: err,
            icon: 'error',
          });
        }
      );
    }else {
      this.locationService.getLocationByUser().subscribe((result) => {
        debugger;
        if(result != null) {
          if (result.status === 200) {
            this.locationList = result.data;
            this.locationList=this.locationList.sort((a, b) => (String(a.locationName)).localeCompare(String(b.locationName)));

            debugger;
            this.rowData = this.locationList;
          }
        }
        else {
          Swal.fire({
            title: 'Seesion Expired',
            text: 'Login Again to Continue',
            icon: 'warning',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.value) {
              debugger;
              this.logOut();
            }
          });
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
   
  }

  logOut(){
    this.router.navigate(["/login/"]);
    sessionStorage.clear();
    window.location.reload();
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
  getCellStyle(params: any) {
    // Check if a row should have a specific color based on some condition
    if (params.data.status == "Started") {
      return { background: '#D5F5E3', color: 'black' };
    } 
    else if (params.data.status == "Not Started") {
      return { background: '#FADBD8', color: 'black' };
    } 
    else if (params.data.status == "On Hold") { 
      return { background: '#F8D6B3', color: 'black' };
    } 
    else if (params.data.status == "Delayed") {
      return { background: '#FCF3CF', color: 'black' };
    } 
    else if (params.data.status == "Complted") {
      return { background: '#D6EAF8', color: 'black' };
    }
    else {
    }
    return null;
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
