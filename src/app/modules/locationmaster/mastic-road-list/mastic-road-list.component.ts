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
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { MasticworkService } from 'src/app/core/services/masticwork.service';
@Component({
  selector: 'app-mastic-road-list',
  templateUrl: './mastic-road-list.component.html',
  styleUrls: ['./mastic-road-list.component.scss']
})
export class MasticRoadListComponent implements OnInit {
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
    private locationService: LocationService,
    private masticWorkService: MasticworkService
  ) {}

  ngOnInit(): void {
    this.getMasticRoads();

    this.columnDefs = [
      // {
      //   headerName: 'Action',
      //   field: '_id',
      //   cellRenderer: 'btnCellRenderer',
      //   minWidth: 180,
      // },
      {
        headerName: 'Road Name',
        field: 'locationName',
        minWidth: 150,
      },
      { headerName: '_id', field: '_id', hide: true },
      { headerName: 'Ward Name', field: 'wardName.wardName' },
     
      { headerName: 'Length (m)', field: 'length' },
      { headerName: 'Width (m)', field: 'width' },
      { headerName: 'Existing Surface', field: 'existingSurface', minWidth: 180 },
      { headerName: 'Existing Surface Side Strip', field: 'sideStrip'},
      { headerName: 'DLp', field: 'dlp'},
      
      { headerName: 'Non-DLP', field: 'nonDlp' },
      { headerName: 'Division', field: 'division' },
    ];
    debugger;
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
  userRole = sessionStorage.getItem('UserRole');
  getMasticRoads() {
   
    this.masticWorkService.getMasticRoads().subscribe(
      (result) => {
        debugger;
        if (result != null) {
          if (result.status === 200) {
            debugger;
            this.rowData = result.data;
             }
        } else {
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

  logOut() {
    this.router.navigate(['/login/']);
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
    if (params.data.status == 'In Progress') {
      return { background: '#D6EAF8', color: 'black', border: '1px dashed black'};
    } else if (params.data.status == 'Not Started') {
      return { background: '#FADBD8', color: 'black',border: '1px dashed black' };
    } else if (params.data.status == 'On Hold') {
      return { background: '#F8D6B3', color: 'black',border: '1px dashed black' };
    } else if (params.data.status == 'Delayed') {
      return { background: '#FCF3CF', color: 'black',border: '1px dashed black' };
    } else if (params.data.status == 'Completed') {
      return { background: '#D5F5E3', color: 'black',border: '1px dashed black' };
    } else {
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
    this.router.navigate(['location/createMasticRoad']);
  }
  statusOptions = ['In Progress', 'Completed', 'On Hold'];

  download() {
    let fileName = 'Mastic Roads' + moment(new Date()).format('DDMMYYYY') + '.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rowData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
    debugger;
  }

}
