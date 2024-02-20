import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ModuleService } from 'src/app/core/services/module.service';
import { LocationService } from 'src/app/core/services/location.service';
import { LocationModel } from 'src/app/core/models/ILocation';
import { ModuleModel } from 'src/app/core/models/IModule';
import {
  ModulesInLocationModel,
  ModulesInLocationObjectModel,
  ModulesInLocationObjectModelList,
} from 'src/app/core/models/IModules-In-Location';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { count, map, startWith, switchMap, tap } from 'rxjs/operators';
import { AssetModel } from 'src/app/core/models/IAsset';
import {
  AssetInstanceListModel,
  AssetInstanceModel,
} from 'src/app/core/models/IAssetInstance';
import { UnitModel } from 'src/app/core/models/IUnit';
import { AgGridAngular } from 'ag-grid-angular';
import { BtnSaveCellRenderer } from './button-save-renderer.component';
import { CommonService } from 'src/app/core/services/common.service';
import { DataentryService } from 'src/app/core/services/dataentry.service';
import { DataEntryModel } from 'src/app/core/models/IDataEntry';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GeneratedataentrypageComponent } from '../../dataentry/generatedataentrypage/generatedataentrypage.component';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/IUser';

@Component({
  selector: 'app-moduledetail',
  templateUrl: './moduledetail.component.html',
  styleUrls: ['./moduledetail.component.scss'],
})
export class ModuledetailComponent {
  pageTitle: string = 'Add Module Details';
  form = new FormGroup({});
  model: any = {};
  idforEdit: string;
  locationList: LocationModel[];
  moduleInLocationList: ModulesInLocationModel[] = [];
  moduleList: ModuleModel[] = [];
  assetList: AssetModel[] = [];
  assetInstanceModel: AssetInstanceModel;
  assetInstanceListModel: AssetInstanceListModel;
  moduleInLoc: ModulesInLocationModel;
  objLocation: LocationModel;
  existingModuleList: ModuleModel[] = [];
  selectedModuleList: ModuleModel[] = [];
  finalModuleList: ModuleModel[] = [];
  objModulesInLocation: ModulesInLocationObjectModel;
  locID: string;
  obj: ModulesInLocationObjectModelList;
  unitList: UnitModel[];
  today = new Date();
  locationName: String;
  userData:User;
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  //@ViewChild('agGrid') agGrid: AgGridAngular;

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
  rowData1: any;
  
  dataEntryDataList: any = [];
  sortedEntryList: any = [];

  columnDefs1;

  gridOption;

  gridOptions = {
    rowHeight: 40,
    getRowHeight: function (params) {
      return 40;
    },
  };

  constructor(
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private dataEntryService: DataentryService,
    private moduleService: ModuleService,
    private router: Router,
    private commonService: CommonService,
    private locationService: LocationService,
    private userService:UserService,
    public matDialog: MatDialog
  ) {
    this.dataEntryService.getDataEntries().subscribe((res) => {
      debugger;
      this.dataEntryDataList = res.data;
      this.dataEntryDataList.forEach((item) => {
        if (item.location != null) {
          // Your code for items that meet the condition
          this.sortedEntryList.push(item);
        }
      });
      console.log('Final Data Entry List', this.sortedEntryList); 
      debugger;
      this.rowData1 = this.sortedEntryList.filter(
        (f) => f.location._id === this.locID
      );
      
      debugger;
    });

    this.userService
    .getUserById(sessionStorage.getItem('UserId'))
    .subscribe((result) => {
      this.userData= result.data[0];
      this.rowData1=this.rowData1.filter(f=>String(f.assignedSE)===String(this.userData._id))
      debugger;
    })
  
  }

  ngOnInit(): void {
    this.getModuleInLocation();

    this.columnDefs = [
      {
        headerName: 'Action',
        field: '_id',
        maxWidth: 120,
        cellRenderer: 'BtnSaveCellRenderer',
        pinned: 'left',
      },
      { headerName: '_id', field: '_id', hide: true },
      {
        headerName: 'Project Name',
        minWidth: 120,
        field: 'location.locationName',
      },
      { headerName: 'Task Name', field: 'module.moduleName', minWidth: 120 },
      
      { headerName: 'Total Target', minWidth: 150, field: 'quantity' },
      {
        headerName: 'Achieved Cumulative Quantity',
        minWidth: 180,
        field: 'cumulativeQuantity',
      },
      {
        headerName: 'Planned Quantity/Day',
        minWidth: 180,
        field: 'quantityPerDay',
      },
      {
        headerName: 'Planned Quantity',
        minWidth: 180,
        field: 'plannedQuantity',
      },
      {
        headerName: 'Quater I Target',
        minWidth: 150,
        field: 'quantityQuarter1',
        editable: true,
        cellStyle: { border: '1px dashed black' },
        valueParser: this.numberValueParser.bind(this),
      },
      {
        headerName: 'Quater II Target',
        minWidth: 150,
        field: 'quantityQuarter2',
        editable: true,
        cellStyle: { border: '1px dashed black' },
        valueParser: this.numberValueParser.bind(this),
      },

      {
        headerName: 'Quater III Target',
        minWidth: 150,
        field: 'quantityQuarter3',
        editable: true,
        cellStyle: { border: '1px dashed black' },
        valueParser: this.numberValueParser.bind(this),
      },
      {
        headerName: 'Quater IV Target',
        minWidth: 150,
        field: 'quantityQuarter4',
        editable: true,
        cellStyle: { border: '1px dashed black' },
        valueParser: this.numberValueParser.bind(this),
      },
      {
        headerName: 'Quater V Target',
        minWidth: 150,
        field: 'quantityQuarter5',
        editable: true,
        cellStyle: { border: '1px dashed black' },
        valueParser: this.numberValueParser.bind(this),
      },
      {
        headerName: 'Rate',
        field: 'rateofwork',
        minWidth: 150,
        editable: true,
        cellStyle: { border: '1px dashed black' },
        valueParser: this.numberValueParser.bind(this),
      },
      { headerName: 'Total Cost', field: 'totalCost', minWidth: 150 },
      {
        headerName: 'Created On',
        minWidth: 150,
        field: 'createdOn',
        valueGetter: this.commonService.createdOnDateFormatter,
      },
      { headerName: 'Created By', minWidth: 150, field: 'createdBy' },
    ];

    this.rowSelection = 'multiple';
    this.frameworkComponents = {
      BtnSaveCellRenderer: BtnSaveCellRenderer,
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

    this.columnDefs1 = [
      {
        headerName: 'Location',
        field: 'location.locationName',
        minWidth: 150,
        pinned: 'left',
      },
      {
        headerName: 'Task Name',
        field: 'moduleName',
        minWidth: 100,
        pinned: 'left',
      },
      { 
        headerName: 'Work Code', 
        field: 'location.workCode', 
        minWidth: 150 
      },
      {
        headerName: 'Contractor Name',
        field: 'location.contractorName',
        minWidth: 250,
      },
      {
        headerName: 'Data Entry Date',
        field: 'dataDate',
        minWidth: 150,
        valueGetter: (params) => {
          return this.commonService.DateFormatter(params.data.dataDate);
        },
      },
      {
        headerName: 'Consumed Quantity',
        field: 'attributeValues.consumedquantity',
        minWidth: 150,
      },
      //{ headerName: 'Cumulative Quantity', field: 'attributeValues.cumulativequantity',minWidth: 150,},
      //  { headerName: 'Total Target Quantity', field: 'attributeValues.totalquantity',minWidth: 150,},
      { 
        headerName: 'Remark', 
        field: 'attributeValues.remark', 
        minWidth: 150 
      },
      { 
        headerName: 'Created By', 
        field: 'createdBy', 
        minWidth: 150 
      },
      {
        headerName: 'Created On',
        field: 'createdOn',
        minWidth: 150,
        valueGetter: this.commonService.createdOnDateFormatter,
      },
    ];
  }

  numberValueParser(params: any): number {
    const userInput = params.newValue;
    // Validate if the input is a valid number
    const parsedValue = parseFloat(userInput);
    // If the parsed value is a valid number, return it; otherwise, return undefined to indicate validation failure
    console.log('Parsed Value ', parsedValue);
    console.log('Parsed Value- isNan(parsed Value) ', isNaN(parsedValue));
    return isNaN(parsedValue) ? undefined : parsedValue;
  }

  // autosave Code ============================================================================================

  selectedCell: any;

  onCellValueChanged(event: any) {
    debugger;
    this.selectedCell = event;
    console.log('Cell value changed:', event.data);
    if (this.selectedCell) {
      this.field = this.selectedCell.colDef.field;
      const updatedValue =
        this.selectedCell.data[this.selectedCell.colDef.field];
      // You can save the updatedValue here, for example, send it to the server or update a local variable.
      console.log('Updated Value:', updatedValue);
      console.log('Updated Value for the field:', this.field);

      this.saveupdatedValues(event.data);
      // Reset selectedCell after saving the value
      // this.selectedCell = null;
    }
  }

  field: any;
  yourMessage: any;
  saveupdatedValues(e) {
    debugger;
    var modID = e._id;
    this.yourMessage = '';
    const data = {
      module: e._id,
      quantity: e.quantity,
      quantityQuarter1: e.quantityQuarter1,
      quantityQuarter2: e.quantityQuarter2,
      quantityQuarter3: e.quantityQuarter3,
      quantityQuarter4: e.quantityQuarter4,
      quantityQuarter5: e.quantityQuarter5,
      rateofwork: e.rateofwork,
      units: null,
      totalCost: (e.rateofwork === '' ? 1 : e.rateofwork) * e.quantity,
      cumulativeQuantity: null,
    };

    this.locationService.addModuleDetails(modID, data).subscribe(
      (result) => {
        if (result.status === 201) {
          debugger;
          this.yourMessage = this.field + ' value Updated';
          const delay = 1000;
          setTimeout(() => {
            this.yourMessage = '';
          }, delay);
          this.getModuleInLocation();
          // window.location.reload()
        }
      },
      (err) => {
        // this.notificationService.warn(':: ' + err);
      }
    );
  }

  // ============================================================================================================

  customStylesValidated = false;
  dataEntryModel: DataEntryModel;
  Click() {
    // this.router.navigate(['location/createdataentry']);
    
    debugger;
    this.customStylesValidated = true;
    if (this.form.invalid) {
      return; // Exit the function if the form is invalid
    }
    debugger;
    const currentDate = new Date();
    const datePipe = new DatePipe('en-US');
    let formattedDate = datePipe.transform(currentDate, 'yyyy-MM-dd');
    debugger;
    // this.dataEntryModel = {
    //   location: this.rowData[0].location._id, 
    //   module: null,
    //   assetInstance: null,
    //   dataDate: new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()),
    //   locationName: null,
    //   moduleName: null,
    //   assetnstanceName: null,
    //   ward: null,
    //   zone: null,
    //   workCode: null,
    //   contractorName: null,
    //   roadStatus: null,
    //   createdBy: null,
    //   createdOn: null,
    //   modifiedBy: null,
    //   modifiedOn: null,
    //   attributeValues: null,
    // };
    let obj = {
      location: this.rowData[0].location._id, 
      module: null,
      assetInstance: null,
      dataDate: formattedDate,
      locationName: null,
      moduleName: null,
      assetnstanceName: null,
      ward: null,
      zone: null,
      workCode: null,
      contractorName: null,
      roadStatus: null,
      assignedSE: this.userData,

      createdBy: null,
      createdOn: null,
      modifiedBy: null,
      modifiedOn: null,
      attributeValues: null,
    };
    debugger;
    this.dataEntryService.getDataEntrySearchParams(obj);
    // const dialogConfig = new MatDialogConfig();
    // // The user can't close the dialog by clicking outside its body
    // dialogConfig.disableClose = true;
    // dialogConfig.id = 'modal-component';
    // dialogConfig.height = "950px";
    // dialogConfig.width = "900px";
    // dialogConfig.position = {
    //   top: '100px', // Example: 50px from the top of the viewport
    //   left: '300px' // Example: 50px from the left of the viewport
    // };    
    // this.matDialog.open(
    //   GeneratedataentrypageComponent
    // );

  debugger;
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true; // Allow closing by clicking outside
  dialogConfig.id = 'modal-component';
  dialogConfig.height = '950px';
  dialogConfig.width = '900px';
  // dialogConfig.position = {
  //   top: '100px',
  //   left: '300px'
  // };    
  debugger;
  dialogConfig.panelClass = 'rounded-dialog'; // Apply custom CSS class for rounded corners
  this.matDialog.open(GeneratedataentrypageComponent, dialogConfig);
  
  }

  getModuleInLocation() {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      this.locID = id;
      if (id) {
        this.locationService.getModulesInLocation(id).subscribe(
          (result) => {
            if (result.status === 200) {
              this.form.reset();
              //this.form =
              //this._fb.group({}).reset()
              this.moduleInLocationList = result.data;
              if (this.moduleInLocationList) {
                debugger;
                this.rowData = this.moduleInLocationList;
                this.locationName =
                  this.moduleInLocationList[0]?.location.locationName;
                this.moduleInLocationList.forEach((element) => {
                  this.moduleList.push(element.module);
                });
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );

        // get asset instance by assetinstace id
        this.locationService.getModulesInLocation(id).subscribe(
          (result) => {
            this.pageTitle = 'Edit Asset Instance';
            if (result.status === 200) {
              this.model = result.data;
              this.moduleInLoc = result.data[0];
              this.idforEdit = id;
              // this.onLocationChange(this.assetInstanceModel.location);
              // this.onModuleChange(this.assetInstanceModel.module)
              //edit data in controls
              console.log(this.model);
              // this.form.patchValue({
              //   qauntity:this.moduleInLoc.quantity,
              //   rateofwork:this.moduleInLoc.rateofwork,
              //   units:this.moduleInLoc.units,
              //   totaldays:this.moduleInLoc.totaldays,
              // })
            }
          },
          (err) => {
            // this.notificationService.warn(':: ' + err);
          }
        );
      }
    });
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultColDef = params.defaultColDef;
    this.context = params.context;
    // this.rowData=params.rowData;
  }

  onModulechange(moduleid: string) {
    const modlInLoc = this.moduleInLocationList.filter(
      (m) => m._id === moduleid
    );
    console.log(modlInLoc);

    this.moduleService
      .getModuleByID(modlInLoc[0].module._id)
      .subscribe((result) => {
        this.assetList = result.data[0].assets;
      }),
      console.log(this.assetList);

    if (modlInLoc) {
      this.form.patchValue({
        //assets: modlInLoc[0].module.assets,
        quantity: modlInLoc[0].quantity,
        rateofwork: modlInLoc[0].rateofwork,
        // startDate: moment(modlInLoc[0].startDate).format("yyyy-MM-DD"),
        // endDate: moment(modlInLoc[0].endDate).format("yyyy-MM-DD"),
        units: modlInLoc[0].units._id,
        // priority: modlInLoc[0].priority
      });
    }
  }

  getModules() {
    this.moduleService.getModules().subscribe(
      (result) => {
        if (result.status === 200) {
          this.moduleList = result.data;
          if (this.moduleList) {
            if (this.selectedModuleList) {
              this.moduleList = this.moduleList.filter(
                (n) => !this.selectedModuleList.some((n2) => n._id == n2._id)
              );
            }
          }
        }
      },
      (err) => {
        // this.notificationService.warn(':: ' + err);
      }
    );
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  Back() {
    this.router.navigate(['location/list']);
  }
}
