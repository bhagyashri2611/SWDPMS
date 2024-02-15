import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  IDataEntryModelResponce,
  IDataEntryGroupModelResponce,
  DataEntryModel,
  ReportSerachParamsModel,
} from '../models/IDataEntry';
import { AssetinstanceService } from './assetinstance.service';
import { DataentryService } from './dataentry.service';
import {
  IOperationDataMasteResponce,
  IReportGrpByAIModelResponce,
  IReportGroupByModelResponse,
  IReportGroupFlowResponse,
} from '../models/IReport';
import * as moment from 'moment';
import { CustomVFS } from './pdfmakefonts';
import { LocationService } from './location.service';
import { IwardResponce } from '../models/IWard';
@Injectable({
  providedIn: 'root',
})
export class ReportService {
  API_URL = environment.baseUrl;
  // baseURL="http://swm.mcgm.gov.in/rurbanapi/userservice.svc/user";
  baseURL = this.API_URL + 'report/';

  constructor(
    private _httpClient: HttpClient,
    private assetInstanceService: AssetinstanceService,
    private locationService: LocationService,
    private dataEntryService: DataentryService
  ) {}
  private content = new BehaviorSubject<any>({});
  public dataEntrySearchParams = this.content.asObservable();
  private handleError(errorResponce: HttpErrorResponse) {
    if (errorResponce.error instanceof ErrorEvent) {
      console.log('Client side Error ', errorResponce.error.message);
    } else {
      console.log('Server side Error ', errorResponce);
    }
    return throwError('something went wrong');
  }

  getDatesBetweenDates = (startDate, endDate) => {
    let dates = [];
    //to avoid modifying the original date
    const theDate = new Date(startDate);
    while (theDate <= endDate) {
      dates = [...dates, new Date(theDate).toISOString()];
      theDate.setDate(theDate.getDate() + 1);
    }
    return dates;
  };
  // getMonthsBetweenDates = (startDate, endDate, scale) => {
  //   let dates = [];
  //   //to avoid modifying the original date
  //   const theDate = new Date(startDate);
  //   while (theDate <= endDate) {
  //     if (scale === '0') {
  //       dates = [
  //         ...dates,
  //         this.datePipe.transform(new Date(theDate), 'yyyy-MM-dd'),
  //       ];
  //     } else {
  //       dates = [
  //         ...dates,
  //         this.datePipe.transform(new Date(theDate), 'yyyy-MM'),
  //       ];
  //     }
  //     theDate.setDate(theDate.getDate() + 1);
  //   }
  //   if (scale === '0') {
  //     return dates;
  //   } else {
  //     return new Set(dates);
  //   }
  // };
  // dateFormate = (date) => {
  //   return this.datePipe.transform(new Date(date), 'dd-MM-yyyy');
  // };
  // dateFormate1 = (date) => {
  //   return this.datePipe.transform(new Date(date), 'MM-dd-yyyy');
  // };
  getSumOfTime = (timeArr) => {
    const conctTime = timeArr; //.reduce((a, b) => a.concat(b), []);  //durations.concat(durations);
    const totalDurations = conctTime
      .slice(1)
      .reduce(
        (prev, cur) => moment.duration(cur).add(prev),
        moment.duration(conctTime[0])
      );
    //console.log(`Total time is: ${Math.floor(totalDurations.asHours())}:${totalDurations.minutes()}`)
    return totalDurations.asHours();
  };
  PDFHeader = {
    table: {
      widths: [100, '*', 100],
      header: 'center',
      body: [
        [
          {
            image: CustomVFS.eps95logo,
            fit: [50, 50],
            alignment: 'center',
          },
          [
            {
              table: {
                body: [
                  ['MUNICIPAL CORPORATION OF GREATER MUMBAI'],
                  ['Sewerage Operations Department'],
                  ['Report by : _____________ '],
                  ['Printed on :           '],
                ],
              },
            },
          ],
          {
            text: [
              {
                text: 'PSPMS',
                fontSize: 10,
                alignment: 'center',
                style: 'header',
              },
            ],
          },
        ],
      ],
    },
  };
  buildTableBody(data, columns) {
    var body = [];
    body.push(columns);
    data.forEach((row) => {
      var dataRow = [];
      columns.forEach((column) => {
        dataRow.push(String(row[column]));
      });
      body.push(dataRow);
    });
    console.log(body);
    return body;
  }

  getDataEntrySearchParams(DataEntryModel) {
    this.content.next(DataEntryModel);
  }
  getDataEntries(): Observable<IDataEntryModelResponce> {
    return this._httpClient
      .get<IDataEntryModelResponce>(this.baseURL)
      .pipe(catchError(this.handleError));
  }
  getReportData(data: any): Observable<IDataEntryModelResponce> {
    return this._httpClient
      .post<IDataEntryModelResponce>(this.baseURL, JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  getPumpReportData(
    data: ReportSerachParamsModel
  ): Observable<IReportGrpByAIModelResponce> {
    return this._httpClient
      .post<IReportGrpByAIModelResponce>(
        this.baseURL + 'phr/',
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  getGroupPumpReportData(
    data: ReportSerachParamsModel
  ): Observable<IReportGroupByModelResponse> {
    return this._httpClient
      .post<IReportGroupByModelResponse>(
        this.baseURL + 'phrgroupbyscalesandassetinstace/',
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  getCubicData(
    data: ReportSerachParamsModel
  ): Observable<IReportGroupByModelResponse> {
    return this._httpClient
      .post<IReportGroupByModelResponse>(
        this.baseURL + 'gritremovedreport/',
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  getMaintenanceData(
    data: ReportSerachParamsModel
  ): Observable<IDataEntryModelResponce> {
    return this._httpClient
      .post<IDataEntryModelResponce>(
        this.baseURL + 'maintenancereport/',
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  getMissingData(data: any): Observable<IReportGroupByModelResponse> {
    return this._httpClient
      .post<IReportGroupByModelResponse>(
        this.baseURL + 'missingdata/',
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  getData(data: any): Observable<any> {
    // return this.getDataEntryGroup(String(data.module));
    return forkJoin([
      this.locationService.getModulesInLocation(data.location),
      this.getReportData(data),
    ]);
  }

  getDataEntriesModulesInLocation(): Observable<any> {
    // return this.getDataEntryGroup(String(data.module));
    return forkJoin([
      this.locationService.getAllModulInLocation(),
      this.getDataEntries(),
    ]);
  }

  getPumpData(data: any): Observable<any> {
    // return this.getDataEntryGroup(String(data.module));
    return forkJoin([
      this.dataEntryService.getDataEntryGroup(data),
      this.assetInstanceService.getAssetInstanceByModuleId(data),
      this.getPumpReportData(data),
    ]);
  }

  getGroupPumpData(data: any): Observable<any> {
    // return this.getDataEntryGroup(String(data.module));
    return forkJoin([
      this.dataEntryService.getDataEntryGroup(data),
      this.assetInstanceService.getAssetInstanceByModuleId(data),
      this.getGroupPumpReportData(data),
    ]);
  }

  getCumData(data: any): Observable<any> {
    // return this.getDataEntryGroup(String(data.module));
    return forkJoin([
      this.dataEntryService.getDataEntryGroup(data),
      this.assetInstanceService.getAssetInstanceByModuleId(data),
      this.getCubicData(data),
    ]);
  }

  getMissingDataReport(data: any): Observable<any> {
    // return this.getDataEntryGroup(String(data.module));
    return forkJoin([
      this.locationService.getAllModulInLocation(),
      this.getMissingData(data),
    ]);
  }

  getAutomationLiveData(data: any): Observable<IOperationDataMasteResponce> {
    return this._httpClient
      .post<IOperationDataMasteResponce>(
        this.baseURL + 'automatiomlivedata/',
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }
  getAutomationLivePumpStatus(
    locationid: String
  ): Observable<IOperationDataMasteResponce> {
    return this._httpClient
      .get<IOperationDataMasteResponce>(
        this.baseURL + 'automatiomlivestatus/' + locationid
      )
      .pipe(catchError(this.handleError));
  }
  getMaintenanceReportData(data: any): Observable<any> {
    console.log(data);
    // return this.getDataEntryGroup(String(data.module));
    return forkJoin([
      this.dataEntryService.getDataEntryGroup(data),
      this.assetInstanceService.getAssetInstanceByModuleId(data),
      this.getMaintenanceData(data),
    ]);
  }

  getGroupPumpingFlowData(data: any): Observable<IReportGroupFlowResponse> {
    return this._httpClient
      .post<IReportGroupFlowResponse>(
        this.baseURL + 'grouppumpingflow/',
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  getWards(): Observable<IwardResponce> {
    return this._httpClient
      .get<IwardResponce>(this.API_URL + 'ward/')
      .pipe(catchError(this.handleError));
  }
}
