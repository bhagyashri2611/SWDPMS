import { AgGridAngular } from 'ag-grid-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BtnCellRenderer } from './button-cell-renderer.component';
import { PandmattributeService } from 'src/app/core/services/pandmattribute.service';
import { PandMAttribute } from 'src/app/core/models/IPandMAttribute';
// import { DialogService } from 'src/app/shared/mat-confirm-dialog/dialog.service';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-pandmattributelist',
  templateUrl: './pandmattributelist.component.html',
  styleUrls: ['./pandmattributelist.component.scss'],
})
export class PandmattributelistComponent implements OnInit {
  PandMAttributeList:PandMAttribute[];

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
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router,
    private pandmattributeService: PandmattributeService,
    // private dialogService: DialogService,
    // private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getPandmattributes();   
    this.columnDefs = [
      {
        headerName: 'Action',
        field: '_id',
        cellRenderer: 'btnCellRenderer',
        minWidth: 300,
      },
     // { headerName: '_id', field: '_id', hide: true },
    //  { headerName: 'locationID', field: 'locationID' },
      {
       headerName: 'Description', field: 'description',
        // headerCheckboxSelection: true,
        // headerCheckboxSelectionFilteredOnly: true,
        // checkboxSelection: true,
      },
      { headerName: 'Display Label', field: 'displayLabel' },
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


  ngAfterViewInit(){
    this.selectAllAmerican();
  }

  getPandmattributes(){   
    this.pandmattributeService.getPandMAttribute().subscribe(
      (result) => {
        console.log( result);
        if (result.status === 200) {
          this.PandMAttributeList=result.data;         
          this.rowData =result.data;
        }
      },
      (err) => {
        alert(err)
      }
    )
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultColDef = params.defaultColDef;
    this.context = params.context;
    // this.rowData=params.rowData;
  }

  onQuickFilterChanged() {
    let val = (<HTMLInputElement>document.getElementById('quickFilter')).value;
    console.log(val)
    this.agGrid.api.setQuickFilter(val);
  }

 selectAllAmerican() {
    this.agGrid.api.forEachNode(function (node) {
      if(node.data._id==="5f5fb46efe0da740ae7c0e49" || node.data._id==="5f5f62c48d7da32bbc05dca2"){
      node.setSelected(true);
      }
     });

    // const selectedNode = this.agGrid.api.getSelectedNodes();
    // const selectedData = selectedNode.map(node => node.data)
    // console.log(selectedData);
    // const selectedDataStringPresentation = selectedData.map(node => node.locationName + ' ' + node._id).join(', ');

    //  alert(`Selected nodes: ${selectedDataStringPresentation}`);

  }
  methodFromParent(cell) {
    console.log(cell)
    alert('Parent Component Method from ' + cell.id + '!');
  }

  setRowData(params){
    params.api.forEachNode(function (node) {
      if(node.data._id==="5f5fb46efe0da740ae7c0e49" || node.data._id==="5f5f62c48d7da32bbc05dca2"){
      node.setSelected(true);
      }
     });
  }
  
  Add(){
    this.router.navigate(['location/createdataentrypandm']);
  }

}
