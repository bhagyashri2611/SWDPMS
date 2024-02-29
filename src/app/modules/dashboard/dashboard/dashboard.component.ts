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
  inProgressRoads: any;
  totalRoads: any;
  completedRoads: any;
  notStartedRoads: any;
  delayedRoads: any;
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

  constructor(
    private router: Router,
    public iconSet: IconSetService,
    private locationService: LocationService,
    private reportService: ReportService,
    private commonService:CommonService
  ) {
    this.userRole = sessionStorage.getItem('UserRole');

    if (this.userRole === 'Data Owner') {
      this.locationService.getLocations().subscribe(
        (result) => {
          debugger;
          if (result != null) {
            if (result.status === 200) {
              this.locationList = result.data;
              this.locationList = this.locationList.sort((a, b) =>
                String(a.locationName).localeCompare(String(b.locationName))
              );
              this.totalRoads = this.locationList.length;
              this.inProgressRoads = this.locationList.filter(
                (f) => f.status === 'In Progress'
              ).length;
              this.completedRoads = this.locationList.filter(
                (f) => f.status === 'Completed'
              ).length;
              this.notStartedRoads = this.locationList.filter(
                (f) => f.status === 'Not Started'
              ).length;
              this.delayedRoads = this.locationList.filter(
                (f) => f.status === 'Delayed'
              ).length;
              this.locationList.forEach((f) => {
                let obj = {
                  name: f.locationName,
                  state: 'New',
                  registered: 'Jan 1, 2021',
                  length: f.length,
                  usage: 50,
                  period: ''+this.commonService.DateFormatter(f.startDate) +' to '+ this.commonService.DateFormatter(f.endDate)+'',
                  payment: 'Mastercard',
                  activity: '10 sec ago',
                  avatar: './assets/img/avatars/1.jpg',
                  status: 'success',
                  color: 'success',
                };
                this.locationListProgress.push(obj)
                debugger;
              });
              debugger;
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
    } else {
      this.locationService.getLocationByUser().subscribe(
        (result) => {
          debugger;
          if (result != null) {
            if (result.status === 200) {
              this.locationList = result.data;
              this.locationList = this.locationList.sort((a, b) =>
                String(a.locationName).localeCompare(String(b.locationName))
              );
              this.totalRoads = this.locationList.length;
              this.inProgressRoads = this.locationList.filter(
                (f) => f.status === 'In Progress'
              ).length;
              this.completedRoads = this.locationList.filter(
                (f) => f.status === 'Completed'
              ).length;
              this.notStartedRoads = this.locationList.filter(
                (f) => f.status === 'Not Started'
              ).length;
              this.delayedRoads = this.locationList.filter(
                (f) => f.status === 'Delayed'
              ).length;

              this.locationList.forEach((f) => {
                let obj = {
                  name: f.locationName,
                  state: 'New',
                  registered: 'Jan 1, 2021',
                  length: f.length,
                  usage: 50,
                  period: ''+this.commonService.DateFormatter(f.startDate) +' to '+ this.commonService.DateFormatter(f.endDate)+'',
                  payment: 'Mastercard',
                  activity: '10 sec ago',
                  avatar: './assets/img/avatars/1.jpg',
                  status: 'success',
                  color: 'success',
                };
                this.locationListProgress.push(obj)
                debugger;
              });
              debugger;
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

    iconSet.icons = { ...freeSet, ...brandSet, ...flagSet };
  }

 
  ngOnInit() {
    //this.onSubmit();
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

  onSubmit() {
    this.reportDataListFinancial = [];
    const chartLabl = [];
    this.dataEntryDataList = [];
    this.reportDataListPhysical = [];

    this.reportService.getDataEntriesModulesInLocation().subscribe(
      (result) => {
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
              debugger;
              this.logOut();
            }
          });
        }
      },
      (err) => {
        alert(err);
      }
    );

    this.reportService.getDataEntriesModulesInLocation().subscribe(
      (result) => {
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
              debugger;
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
