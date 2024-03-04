import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbCallingService } from 'src/app/core/services/db-calling.service';
import { ProgressModel } from 'src/app/core/models/IProgressModel';
import { TransactModel } from 'src/app/core/models/ITransactModel';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { CustomVFS } from 'src/app/core/services/pdfmakefonts';
import * as XLSX from 'xlsx';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { ChartType, ChartOptions, ChartDataset } from 'chart.js';
import { IconSetService } from '@coreui/icons-angular';
import { brandSet, flagSet, freeSet } from '@coreui/icons';
import { LocationModel } from 'src/app/core/models/ILocation';
import {
  IModulesInLocationResponse,
  ModulesInLocationModel,
} from 'src/app/core/models/IModules-In-Location';
import {
  DataEntryGroupModel,
  DataEntryModel,
  IDataEntryModelResponce,
} from 'src/app/core/models/IDataEntry';
import { AssetInstanceListModel } from 'src/app/core/models/IAssetInstance';
import { LocationService } from 'src/app/core/services/location.service';
import { ReportService } from '../../../core/services/report.service';
import { CommonService } from 'src/app/core/services/common.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  locationList: LocationModel[];
  
  userRole: String;
  locationListProgress: any[]=[];
  moduleInLocationList: ModulesInLocationModel[] = [];
  dataEntryList: DataEntryModel[];
  dataEntryDataList: DataEntryModel[] = [];
  assetInstanceList: AssetInstanceListModel[] = [];
  dataEntryModel: DataEntryModel;
  dataentryGroup: DataEntryGroupModel;
  DatesBetweenDatesList: Date[];

  modulesInLocationResponse: IModulesInLocationResponse;
  dataEntryModelResponce: IDataEntryModelResponce;
  reportDataListFinancial: any = [];
  reportDataListPhysical: any = [];
  MonthsBetweenDatesList: any;
  lastMonth: Date;
  monthBforlastMonth: Date;

  totalRoads: any;
  completedRoads: any;
  notStartedRoads: any;
  delayedRoads: any;
  inProgressRoads: any;
  onHoldRoads: any;

  totalRoadsLength: any = 0;
  completedRoadsLength: any= 0;
  notStartedRoadsLength: any= 0;
  delayedRoadsLength: any= 0;
  inProgressRoadsLength: any= 0;
  onHoldRoadsLength: any= 0;

  constructor(
    private router: Router,
    public iconSet: IconSetService,
    private locationService: LocationService,
    private reportService: ReportService,
    private commonService:CommonService
  ) {

   
    debugger;
    this.userRole = sessionStorage.getItem('UserRole');

    if (this.userRole === 'Data Owner') {
      this.locationService.getLocations().subscribe((result) => {
          
          if (result != null) {
            if (result.status === 200) {
              this.totalRoadsLength = 0;
              this.locationList = result.data;
              this.locationList = this.locationList.sort((a, b) =>
                String(a.locationName).localeCompare(String(b.locationName))
              );
              
              this.totalRoads = this.locationList.length;

              this.locationList.forEach((loc) => {
                this.totalRoadsLength = this.totalRoadsLength + loc.length;
              });

              this.locationList.forEach((loc) => {
                this.totalRoadsLength = this.totalRoadsLength + loc.length;
              });

              this.inProgressRoads = this.locationList.filter(
                (f) => f.status === 'In Progress'
              ).length;
              this.locationList.forEach((loc) => {
                if(loc.status === 'In Progress'){
                  this.inProgressRoadsLength = this.inProgressRoadsLength + loc.length;
                }
              });


              this.completedRoads = this.locationList.filter(
                (f) => f.status === 'Completed'
              ).length;
              this.locationList.forEach((loc) => {
                if(loc.status === 'Completed'){
                  this.completedRoadsLength = this.completedRoadsLength + loc.length;
                }
              });


              this.notStartedRoads = this.locationList.filter(
                (f) => f.status === 'Not Started'
              ).length;
              this.locationList.forEach((loc) => {
                if(loc.status === 'Not Started'){
                  this.notStartedRoadsLength = this.notStartedRoadsLength + loc.length;
                }
              });


              this.delayedRoads = this.locationList.filter(
                (f) => f.status === 'Delayed'
              ).length;
              this.locationList.forEach((loc) => {
                if(loc.status === 'Delayed'){
                  this.delayedRoadsLength = this.delayedRoadsLength + loc.length;
                }
              });

              this.onHoldRoads = this.locationList.filter(
                (f) => f.status === 'On Hold'
              ).length;
              this.locationList.forEach((loc) => {
                if(loc.status === 'On Hold'){
                  this.onHoldRoadsLength = this.completedRoadsLength + loc.length;
                }
              });

              if(this.locationList.length >0) {
                this.locationService.getAllModulInLocationForDashboard().subscribe((result) => {
                  debugger;
                  if (result != null) { 
                    if (result) { 
                      debugger;
                        this.moduleInLocationList = result.data;   
                        if(this.moduleInLocationList.length > 0){
                          this.getLocationTable();
                        }        
                    }
                    else { alert('No Data Found'); }
            
                  }
                  else { }
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
    } else {
      this.locationService.getLocationByUser().subscribe(
        (result) => {
          this.totalRoadsLength = 0;
          
          if (result != null) {
            if (result.status === 200) {
              this.locationList = result.data;
              this.locationList = this.locationList.sort((a, b) =>
                String(a.locationName).localeCompare(String(b.locationName))
              );
              
              this.totalRoads = this.locationList.length;
              this.locationList.forEach((loc) => {
                debugger;
                this.totalRoadsLength = this.totalRoadsLength + loc.length;
              });

              this.inProgressRoads = this.locationList.filter(
                (f) => f.status === 'In Progress'
              ).length;
              this.locationList.forEach((loc) => {
                if(loc.status === 'In Progress'){
                  this.inProgressRoadsLength = this.inProgressRoadsLength + loc.length;
                }
              });


              this.completedRoads = this.locationList.filter(
                (f) => f.status === 'Completed'
              ).length;
              this.locationList.forEach((loc) => {
                if(loc.status === 'Completed'){
                  this.completedRoadsLength = this.completedRoadsLength + loc.length;
                }
              });


              this.notStartedRoads = this.locationList.filter(
                (f) => f.status === 'Not Started'
              ).length;
              this.locationList.forEach((loc) => {
                if(loc.status === 'Not Started'){
                  this.notStartedRoadsLength = this.notStartedRoadsLength + loc.length;
                }
              });


              this.delayedRoads = this.locationList.filter(
                (f) => f.status === 'Delayed'
              ).length;
              this.locationList.forEach((loc) => {
                if(loc.status === 'Delayed'){
                  this.delayedRoadsLength = this.delayedRoadsLength + loc.length;
                }
              });

              this.onHoldRoads = this.locationList.filter(
                (f) => f.status === 'On Hold'
              ).length;
              this.locationList.forEach((loc) => {
                if(loc.status === 'On Hold'){
                  this.onHoldRoadsLength = this.completedRoadsLength + loc.length;
                }
              });

              if(this.locationList.length >0) {
                this.locationService.getAllModulInLocationForDashboard().subscribe((result) => {
                  debugger;
                  if (result != null) { 
                    if (result) { 
                      debugger;
                        this.moduleInLocationList = result.data;   
                        if(this.moduleInLocationList.length > 0){
                          this.getLocationTable();
                        }        
                    }
                    else { alert('No Data Found'); }
            
                  }
                  else { }
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

    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

  mil: any[]= [];
  getLocationTable(){
    debugger;

    this.locationList.forEach((f) => {
      debugger;
      this.mil  = this.moduleInLocationList.filter(lm=>{
        if(lm.location!=null)
        {
          return String(lm?.location?._id) === String(f._id)
          debugger;
        }else
        return false;
        debugger;
      });
      debugger;
      let pqc= this.mil.filter(mil=>{
        return mil.module.moduleName==='Completion of Crust (PQC)'
      })
      let exc= this.mil.filter(mil=>{
        return mil.module.moduleName==='Excavation'
      })
      let duct= this.mil.filter(mil=>{
        return mil.module.moduleName==='Laying of Duct'
      })
      let swd= this.mil.filter(mil=>{
        return mil.module.moduleName==='SWD Work'
      })

      let weightedProgress =  Number(
      (((pqc[0].cumulativeQuantity/f.length)*100 ) * 0.3) +
      (((exc[0].cumulativeQuantity/f.length)*100 ) * 0.2 ) +
      (((duct[0].cumulativeQuantity/f.length)*100 ) * 0.2 ) +
      (((swd[0].cumulativeQuantity/f.length)*100 ) * 0.3 )
      ).toFixed(2);


      let obj = {
        name: f.locationName,
        state: 'New',
        registered: 'Jan 1, 2021',
        length: f.length,
        usage:Number ( (pqc[0].cumulativeQuantity/f.length)*100 ).toFixed(2),
        weightedProgress: weightedProgress ? weightedProgress : 0,
        period: ''+this.commonService.DateFormatter(f.startDate) +' to '+ this.commonService.DateFormatter(f.endDate)+'',
        payment: 'Mastercard',
        activity: '10 sec ago',
        avatar: './assets/img/avatars/1.jpg',
        status: f.status,
        color: 'success',
      };
      this.locationListProgress.push(obj)
    });
  }

 
  ngOnInit() {
    debugger;
    // this.onSubmit1();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getDays(startDate: Date, endDate: Date): number {
    const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  sampl : any =[];
  sampl1 : any =[];
  onSubmit() {
    this.reportDataListFinancial = [];
    const chartLabl = [];
    this.dataEntryDataList = [];
    this.reportDataListPhysical = [];

    this.reportService.getDataEntriesModulesInLocation().subscribe((result) => {
        if (result != null) {
          
          if (result) {
     
            this.moduleInLocationList = result.data;
            this.dataEntryDataList = this.dataEntryModelResponce.data;



            // 1-March-2024 My code
            this.sampl = this.moduleInLocationList;
            this.sampl = this.sampl.features;
            
            this.sampl.forEach((s) => { 
              this.sampl1.push(s.properties)
            });
            debugger;
            
            this.locationList.forEach((loc) => {
              const moduleInLoc = this.sampl1.filter((f) => f.location._id === loc._id)
            
              const tc = [];
              const cc = [];
              const moduleObjArr = [];

              if (moduleInLoc) {
                moduleInLoc.forEach((modInLoc) => {
                  const moduletotalCost = modInLoc.totalCost;
                  const rate = modInLoc.rateofwork;
                  const consumedQntyFinancial = [];
                  const dataFinancial = this.dataEntryDataList.filter(
                    (f) => f.module._id === modInLoc._id
                  );
                  if (dataFinancial) {
                    dataFinancial.forEach((r) => {
                      consumedQntyFinancial.push(
                        Number(r.attributeValues['consumedquantity'])
                      );
                    });

                    const cost = consumedQntyFinancial.reduce(
                      (a, b) => a + b,
                      0
                    );
                    const modulecurrentCost = cost * rate;
                    tc.push(moduletotalCost);
                    cc.push(modulecurrentCost);
                  }

                  //Financial Progres-----------------------------------------------------------------------------------------

                  const moduleQuantity = [];
                  const moduleDays = [];
                  const consumedQuantity = [];
                  const consumedDays = [];

                  const mQnty = modInLoc.quantity;
                  const mDays = modInLoc.totaldays;
                  const consumedQntyPhysical = [];
                  const dataPhysical = this.dataEntryDataList.filter(
                    (f) => f.module._id === modInLoc._id
                  );
                  if (dataPhysical) {
                    dataPhysical.forEach((r) => {
                      consumedQntyPhysical.push(
                        Number(r.attributeValues['consumedquantity'])
                      );
                    });
                    const cQnty = consumedQntyPhysical.reduce(
                      (a, b) => a + b,
                      0
                    );
                    const cDays = this.getDays(
                      new Date(modInLoc.startDate),
                      new Date()
                    );

                    moduleQuantity.push(mQnty);
                    moduleDays.push(mDays);
                    consumedDays.push(cDays);
                    consumedQuantity.push(cQnty);
                  }

                  const ccost = consumedQuantity.reduce((a, b) => a + b, 0);
                  const tcost = moduleQuantity.reduce((a, b) => a + b, 0);
                  const ActualWorkCompleted =
                    (ccost / tcost) * 100 ? (ccost / tcost) * 100 : 0;

                  const cdays = consumedDays.reduce((a, b) => a + b, 0);
                  const tdays = moduleDays.reduce((a, b) => a + b, 0);

                  const pwc =
                    (((tcost / tdays) * cdays) / tcost) * 100
                      ? (((tcost / tdays) * cdays) / tcost) * 100
                      : 0;
                  const PlannedWorkCompleted = pwc < 100 ? pwc : 100;
                  const Status =
                    ActualWorkCompleted == 100
                      ? 'Completed'
                      : ActualWorkCompleted != 0 &&
                        ActualWorkCompleted == PlannedWorkCompleted
                      ? 'On Track'
                      : ActualWorkCompleted == 0 && PlannedWorkCompleted == 0
                      ? 'Not Started'
                      : 'Delayed';

                  let objArrFinancial = {
                    locationName: loc.locationName,
                    moduleName: modInLoc.module.moduleName,
                    priority: modInLoc.priority,
                    PlannedWorkCompleted: parseFloat(
                      String(PlannedWorkCompleted)
                    ).toFixed(2),
                    ActualWorkCompleted: parseFloat(
                      String(ActualWorkCompleted)
                    ).toFixed(2),
                    Status: Status,
                  };
                  moduleObjArr.push(objArrFinancial);
                });
              }

              //Physical Progress---------------------
              moduleObjArr.sort(compare_qty);
              this.reportDataListPhysical.push(moduleObjArr[0]);

              //Financial Progress---------------------
              const ccost = cc.reduce((a, b) => a + b, 0);
              const tcost = tc.reduce((a, b) => a + b, 0);
              const percent = (ccost / tcost) * 100 ? (ccost / tcost) * 100 : 0;

              //Both reports in one obj-----------------------------
              let objArrFinancial = {
                workCode: loc.workCode,

                locationName: loc.locationName,
                moduleName: moduleObjArr[0].moduleName,
                priority: moduleObjArr[0].priority,
                PlannedWorkCompleted: moduleObjArr[0].PlannedWorkCompleted,
                ActualWorkCompleted: moduleObjArr[0].ActualWorkCompleted,
                Status: moduleObjArr[0].Status,
                totalCost: (tcost / 10000000).toFixed(2),
                currentCost: (ccost / 10000000).toFixed(2),
                percentage: parseFloat(String(percent)).toFixed(2),
              };
              this.reportDataListFinancial.push(objArrFinancial);
            });
            
          }
           else {
            alert('No Data Found');
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
              
              this.logOut();
            }
          });
        }
      },
      (err) => {
        alert(err);
      }
    );

    this.reportService.getDataEntriesModulesInLocation().subscribe((result) => {
        if (result != null) {
          if (result) {
            
            this.modulesInLocationResponse = result[0];
            this.dataEntryModelResponce = result[1];
            this.moduleInLocationList = this.modulesInLocationResponse.data;
            this.dataEntryDataList = this.dataEntryModelResponce.data;
            this.locationList.forEach((loc) => {
              const moduleInLoc = this.moduleInLocationList.filter(
                (f) => f.location._id === loc._id
              );
              const moduleObjArr = [];
              const isPipeofLaying = moduleInLoc.find(
                (f) => f.module.moduleName === 'Excavation'
              );
              moduleInLoc.forEach((modInLoc) => {
                const moduleQuantity = [];
                const moduleDays = [];
                const consumedQuantity = [];
                const consumedDays = [];
                const mQnty = modInLoc.quantity;
                const mDays = modInLoc.totaldays;
                const consumedQnty = [];
                const data = this.dataEntryDataList.filter(
                  (f) => f.module._id === modInLoc._id
                );
                if (data) {
                  data.forEach((r) => {
                    consumedQnty.push(
                      Number(r.attributeValues['consumedquantity'])
                    );
                  });
                  const cQnty = consumedQnty.reduce((a, b) => a + b, 0);
                  const cDays = this.getDays(
                    new Date(modInLoc.startDate),
                    new Date()
                  );

                  moduleQuantity.push(mQnty);
                  moduleDays.push(mDays);
                  consumedDays.push(cDays);
                  consumedQuantity.push(cQnty);
                }
                const ccost = consumedQuantity.reduce((a, b) => a + b, 0);
                const tcost = moduleQuantity.reduce((a, b) => a + b, 0);
                const ActualWorkCompleted =
                  (ccost / tcost) * 100 ? (ccost / tcost) * 100 : 0;

                const cdays = consumedDays.reduce((a, b) => a + b, 0);
                const tdays = moduleDays.reduce((a, b) => a + b, 0);

                const pwc =
                  (((tcost / tdays) * cdays) / tcost) * 100
                    ? (((tcost / tdays) * cdays) / tcost) * 100
                    : 0;
                const PlannedWorkCompleted = pwc < 100 ? pwc : 100;
                const Status =
                  ActualWorkCompleted == 100
                    ? 'Completed'
                    : ActualWorkCompleted != 0 &&
                      ActualWorkCompleted == PlannedWorkCompleted
                    ? 'On Track'
                    : ActualWorkCompleted == 0 && PlannedWorkCompleted == 0
                    ? 'Not Started'
                    : 'Delayed';

                let objArr = {
                  locationName: loc.locationName,
                  moduleName: modInLoc.module.moduleName,
                  priority: modInLoc.priority,
                  PlannedWorkCompleted: parseFloat(
                    String(PlannedWorkCompleted)
                  ).toFixed(2),
                  ActualWorkCompleted: parseFloat(
                    String(ActualWorkCompleted)
                  ).toFixed(2),
                  Status: Status,
                };
                moduleObjArr.push(objArr);
              });
              
              moduleObjArr.sort(compare_qty);

              this.reportDataListPhysical.push(moduleObjArr[0]);
            });
            
          } else {
            alert('No Data Found');
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
        alert(err);
      }
    );
  }



  logOut() {
    this.router.navigate(['/login/']);
    sessionStorage.clear();
    window.location.reload();
  }
}
function compare_qty(a, b) {
  if (a.priority > b.priority) {
    return -1;
  } else if (a.priority < b.priority) {
    return 1;
  } else {
    return 0;
  }
}
