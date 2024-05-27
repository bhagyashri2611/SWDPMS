import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationModel } from 'src/app/core/models/ILocation';
import { ModulesInLocationModel } from 'src/app/core/models/IModules-In-Location';
import { CommonService } from 'src/app/core/services/common.service';
import { LocationService } from 'src/app/core/services/location.service';
import Swal from 'sweetalert2';

import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import * as moment from 'moment';

import { AgGridAngular } from 'ag-grid-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataentryService } from 'src/app/core/services/dataentry.service';
import { DataEntryModel } from 'src/app/core/models/IDataEntry';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-location-data-entry',
  templateUrl: './location-data-entry.component.html',
  styleUrls: ['./location-data-entry.component.scss']
})
export class LocationDataEntryComponent implements OnInit{
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;

  locationList: LocationModel[];
  dataEntryList: DataEntryModel[] = [];

  userRole: String;

  Form: FormGroup;

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
  rowData: any = [];
  gridOption;
  userList=[]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,

    private userService: UserService,
    private dataentryService: DataentryService,
    private commonService: CommonService
  ) { 

    this.userService.getUsers().subscribe(
      (result) => {
        if (result != null) {
          if (result.status === 200) {
            this.userList = result.data;
          }
        }}
      )

  }

  mil: any[] = [];
  filteredList: any = [];
  getLocationTable() {
    this.rowData = [];
    // this.filteredList = this.locationList.map((item1) => {
      
    //   let correspondingItem = this.dataEntryList.find(
    //     (item2) => item2.location._id === "65df311d8aa9071cf82aa578"
    //   );
      
    //   if (correspondingItem != undefined) {
    //     debugger;
    //     return {
    //       locationName: correspondingItem.location.locationName,
    //       dataDate: this.commonService.DateFormatter(correspondingItem.dataDate),
          
    //     };
    //   }
    //   else {
    //     return {
    //       locationName: item1.locationName,
    //       dataDate: null,
    //     };
    //   }
    // });

    this.filteredList = this.dataEntryList.map((item1) => {
      
      let correspondingItem = this.locationList.find(
        (item2) => item2._id === item1.location._id
      );
      
      if (correspondingItem != undefined) {
        // debugger;
        return {
          locationName: correspondingItem.locationName,
          dataDate: item1.dataDate,
          wardName: item1.ward,
          ContractorName: item1.contractorName,
          locationId: item1.location._id,
          status: item1.location.status,
          zone: item1.location.zoneName

        };
      }
      else {
        return {
          locationName: item1.location.locationName,
          dataDate: null,
          wardName: item1.ward,
          ContractorName: item1.contractorName,
          locationId: item1.location._id,
          status: item1.location.status,
          zone: item1.location.zoneName
        };
      }
    });

    // this.rowData = this.filteredList;
    const groupedData = this.filteredList.reduce((acc, obj) => {
      const key = obj.locationName;
      if(obj.dataDate != null){
        if (!acc[key] || new Date(obj.dataDate) > new Date(acc[key].dataDate)) {
          acc[key] = obj;
        }
        return acc;
      }
      else {
        return acc
      }
     
    }, {});
    
    // Convert groupedData object back to array
    let result: any = Object.values(groupedData);

    this.rowData = this.locationList.map((loc) => {
      let matchedItem = result.find(
        (res) => res.locationId === loc._id
      );
      if (matchedItem != undefined) {
        
      }
      else {
        return {
          locationName: loc.locationName,
          dataDate: null,
          wardName: loc.wardName.wardName,
          ContractorName: loc.contractorName,
          locationId: loc._id,
          status: loc.status,
          zone: loc.zoneName
        };
      }

    });
    const filteredMapData = this.filteredData.filter((fd) => fd.moduleName === "SWD Work");
    let locationUserMapping=[]

    this.userList.forEach((user) => {
      user.locations.forEach((locationId) => {
        const location = this.locationList.find(
          (loc) => String(loc._id) === String(locationId)
        );
        if (location) {
          const entry = {
            id: locationId,
            locationName: location.locationName,
            userId:user._id,
            name: user.firstName, // You can use any user property you want here
          };

          locationUserMapping.push(entry);
        } 
      });
    });

    let finalRowData = this.locationList.map((loc) => {
            let matchedItem = filteredMapData.find(
              (fmd) => fmd.location._id === loc._id
            );
            if (matchedItem != undefined) {

              let userName = locationUserMapping.filter((u) => String(u.id) === String(loc._id));
            
            }
            else {
              let userName = locationUserMapping.filter((u) => String(u.id) === String(loc._id));
              return {
                locationName: loc.locationName,
                dataDate: null,
                wardName: loc.wardName.wardName,
                ContractorName: loc.contractorName,
                locationId: loc._id,
                status: loc.status,
                zone: loc.zoneName,
                userName:userName[0].name,
                userId:userName[0].userId

              };
            }
      
          });

          finalRowData =  finalRowData.filter(item => item !== undefined);
          this.rowData = finalRowData.filter(item => item.status === "In Progress");
   
  }
  
  gridOptions = {
    rowHeight: 40,
    getRowHeight: function (params) {
      return 40;
    },
  };

  currentRoute: any = '';
  object: any;

  async ngOnInit() {
    this.rowData = [];

    this.Form = this.fb.group({
      fromdate: ['', Validators.required],
      todate: ['', Validators.required],
    });

    this.currentRoute = '';
    this.object = {};

    this.userRole = sessionStorage.getItem('UserRole');
    if (this.userRole === 'Data Owner') {
      this.locationService.getLocations().subscribe(
        (result) => {
          if (result != null) {
            if (result.status === 200) {
              this.locationList = result.data;
              this.locationList=this.locationList.filter(f=>String(f.roadType)===String("Mega CC Road"))

              this.locationList = this.locationList.sort((a, b) =>
                String(a.locationName).localeCompare(String(b.locationName))
              );


              if (this.locationList.length > 0) {
                this.dataentryService.getDataEntries().subscribe((result) => {
                    if (result != null) {
                      if (result) {
                        this.dataEntryList = result.data;
                        if (this.dataEntryList.length > 0) {
                          this.getLocationTable();
                        }
                      } else {
                        alert('No Data Found');
                      }
                    } else {
                    }
                  });
              }
            }
          } else {
            Swal.fire({
              title: 'Seesion Expired',
              text: 'Login Again to Continue',
              icon: 'warning',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.value) {
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
        
    this.columnDefs = [
      {
        headerName: 'Location Name',
        field: 'locationName',
        minWidth: 300,
      },
      {
        headerName: 'Ward',
        field: 'wardName',
        minWidth: 100,
      }, 
      {
        headerName: 'Contractor',
        field: 'ContractorName',
        minWidth: 150,
      }, 
      {
        headerName: 'Zone',
        field: 'zone',
        minWidth: 150,
      },
      {
        headerName: 'Status',
        field: 'status',
        minWidth: 150,
      },
      // {
      //   headerName: 'Data Date',
      //   field: 'dataDate',
      //   minWidth: 150,
      // },
      {
        headerName: 'User Name',
        field: 'userName',
        minWidth: 150,
      },
    ];

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

  onQuickFilterChanged() {
    let val = (<HTMLInputElement>document.getElementById('quickFilter')).value;
    this.agGrid.api.setQuickFilter(val);
  }

  OnGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.defaultColDef = params.defaultColDef;
    this.context = params.context;
  }

  download() {
    const newArray = this.rowData.map((el) => {
      return {        
        LocationName: el.locationName,
        Zone: el.zone,
        ward: el.wardName,
        contractorName: el.ContractorName,
        status: el.status,
        dataDate: el.dataDate,
        userName:el.userName,
        userId:el.userId
      };
    });

    let fileName = 'Location Data Entry Report' + moment(new Date()).format('DDMMYYYY') + '.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newArray);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, fileName);
  }

  filteredData: any =[];
  search() {    
    debugger;
    let AllDataEntryList = this.dataEntryList;
    this.filteredData = [];
    var FromDate = this.Form.value.fromdate;
    var toDate = this.Form.value.todate;
    let locationUserMapping=[]

    this.userList.forEach((user) => {
      user.locations.forEach((locationId) => {
        const location = this.locationList.find(
          (loc) => String(loc._id) === String(locationId)
        );
        if (location) {
          const entry = {
            id: locationId,
            locationName: location.locationName,
            userId:user._id,
            name: user.firstName, // You can use any user property you want here
          };

          locationUserMapping.push(entry);
        } 
      });
    });
    console.log(locationUserMapping);
    

    if (this.Form.value.fromdate != undefined && this.Form.value.todate != undefined) {
      if (new Date(this.Form.value.fromdate) > new Date(this.Form.value.todate)) {
        Swal.fire({
          text: ' From Date Must be less than To date',
          icon: 'warning'
        })
      }
      else {
        this.filteredData = AllDataEntryList.filter(item => {
          if(item.dataDate != null) {
              var itemDataDate = ( this.commonService.DateFormatterNew(item.dataDate) ).toString();
              if(itemDataDate >= FromDate && itemDataDate <= toDate) {
                return itemDataDate >= FromDate && itemDataDate <= toDate;
              }           
          }               
        });
        debugger;
        let mapData:any = [];
        if (this.filteredData) {
          const filteredMapData = this.filteredData.filter((fd) => fd.moduleName === "SWD Work");
      
          let finalRowData = this.locationList.map((loc) => {
            let matchedItem = filteredMapData.find(
              (fmd) => fmd.location._id === loc._id
            );
            if (matchedItem != undefined) {

              let userName = locationUserMapping.filter((u) => String(u.id) === String(loc._id));
            
            }
            else {
              let userName = locationUserMapping.filter((u) => String(u.id) === String(loc._id));
              return {
                locationName: loc.locationName,
                dataDate: null,
                wardName: loc.wardName.wardName,
                ContractorName: loc.contractorName,
                locationId: loc._id,
                status: loc.status,
                zone: loc.zoneName,
                userName:userName[0].name,
                userId:userName[0].userId

              };
            }
      
          });

          finalRowData =  finalRowData.filter(item => item !== undefined);
          this.rowData = finalRowData.filter(item => item.status === "In Progress");
        }
        
      }
    }
   }

   clearFilters() {
    this.Form.reset();
    this.getLocationTable();
   }
    
  logOut() {
    this.router.navigate(['/login/']);
    sessionStorage.clear();
    window.location.reload();
  }

}