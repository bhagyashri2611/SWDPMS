import { AgGridAngular } from 'ag-grid-angular'
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BtnCellRenderer } from './button-cell-renderer.component';
import { AssetModulesService } from 'src/app/core/services/asset-modules.service';
import { AssetModel } from 'src/app/core/models/IAsset';
// import { NotificationService } from 'src/app/shared/notification.service';
// import { DialogService } from 'src/app/shared/mat-confirm-dialog/dialog.service';
import { DataEntryGroupModel } from 'src/app/core/models/IDataEntry';
import { DataentryService } from 'src/app/core/services/dataentry.service';
import { PandmattributegroupService } from 'src/app/core/services/pandmattributegroup.service';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-dataentrypandattributegrouplist',
  templateUrl: './dataentrypandattributegrouplist.component.html',
  styleUrls: ['./dataentrypandattributegrouplist.component.scss']
})
export class DataentrypandattributegrouplistComponent implements OnInit {
  dataentryGroupList: DataEntryGroupModel[]
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
  rowData: any;


  gridOption;


  gridOptions = {
    rowHeight: 40,
    getRowHeight: function (params) {
      return 40;
    },
  };

  constructor(
    private route: ActivatedRoute,private commonService:CommonService,
    private router: Router, 
    private pandmattributegroupService: PandmattributegroupService, 
    //private dialogService: DialogService,
   // private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
    this.getdataentryGroupList();
    this.columnDefs = [
      {
        headerName: 'Action',
        field: '_id',
        cellRenderer: 'btnCellRenderer',
        minWidth: 300,
      },
      { headerName: '_id', field: '_id', hide: true },
      {
        headerName: 'Group For Location', field: 'module.locationName',
      },

      { headerName: 'Created On', field: 'createdOn' , valueGetter: this.commonService.createdOnDateFormatter},
      { headerName: 'Created By', field: 'createdBy' }
    ];
    this.rowSelection = 'multiple';
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderer
    };
    this.context = { componentParent: this };

    this.defaultColDef = {
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
      sortingOrder: ["asc", "desc"]
    };
  }
  ngAfterViewInit() {
    this.selectAllAmerican();
  }

  getdataentryGroupList() {   
    this, this.pandmattributegroupService.getDataentryGroupList().subscribe(
      (result) => {       
        if (result.status === 200) {
          this.dataentryGroupList = result.data;
          this.rowData= result.data;
          debugger;
          console.log(this.rowData)
        }
      },
      (err) => {
        //this.notificationService.warn(':: ' + err);
      }
    )
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
      if (node.data._id === "5f5fb46efe0da740ae7c0e49" || node.data._id === "5f5f62c48d7da32bbc05dca2") {
        node.setSelected(true);
      }
    });

  }
  methodFromParent(cell) {

    alert('Parent Component Method from ' + cell.id + '!');
  }

  setRowData(params) {
    params.api.forEachNode(function (node) {
      if (node.data._id === "5f5fb46efe0da740ae7c0e49" || node.data._id === "5f5f62c48d7da32bbc05dca2") {
        node.setSelected(true);
      }
    });
  }

  Add() {
    this.router.navigate(['location/dataentrypandmgroup']);
  }

}