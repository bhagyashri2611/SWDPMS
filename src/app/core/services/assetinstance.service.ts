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
  AssetInstanceModel,
  IAssetInstanceListResponce,
  IAssetInstanceResponce,
  IAssetPandMAttributeGroupModelResponce,
} from '../models/IAssetInstance';
// import { AssetinstancemasterModule } from 'src/app/module/assetinstancemaster/assetinstancemaster.module';

@Injectable({
  providedIn: 'root',
})
export class AssetinstanceService {
  API_URL = environment.baseUrl;
  baseURL = this.API_URL + 'assetinstance/';
  constructor(private _httpClient: HttpClient) {}
  private handleError(errorResponce: HttpErrorResponse) {
    if (errorResponce.error instanceof ErrorEvent) {
      console.log('Client side Error ', errorResponce.error.message);
    } else {
      console.log('Server side Error ', errorResponce);
    }
    return throwError('something went wrong');
  }

  getAssetInstances(): Observable<IAssetInstanceResponce> {
    return this._httpClient
      .get<IAssetInstanceResponce>(this.baseURL)
      .pipe(catchError(this.handleError));
  }
  getAssetInstanceById(
    assetid: string
  ): Observable<IAssetInstanceListResponce> {
    return this._httpClient
      .get<IAssetInstanceListResponce>(this.baseURL + assetid)
      .pipe(catchError(this.handleError));
  }
  addAssetInstance(
    assets: AssetInstanceModel
  ): Observable<IAssetInstanceResponce> {
    return this._httpClient
      .post<IAssetInstanceResponce>(this.baseURL, JSON.stringify(assets), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }
  updateAssetInstance(
    assetinstanceid: string,
    assets: AssetInstanceModel
  ): Observable<IAssetInstanceResponce> {
    return this._httpClient
      .patch<IAssetInstanceResponce>(
        this.baseURL + assetinstanceid,
        JSON.stringify(assets),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }
  addAssetInstanceDetails(
    assetinstanceid: string,
    assets: AssetInstanceModel
  ): Observable<IAssetInstanceResponce> {
    return this._httpClient
      .patch<IAssetInstanceResponce>(
        this.baseURL + 'addassetinstancedetails/' + assetinstanceid,
        JSON.stringify(assets),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }
  getAssetInstanceByModuleId(
    data: any
  ): Observable<IAssetInstanceListResponce> {
    return this._httpClient
      .post<IAssetInstanceListResponce>(
        this.baseURL + 'assetinstances/',
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }
  getAIByLocationAndModuleId(
    data: any
  ): Observable<IAssetInstanceListResponce> {
    return this._httpClient
      .post<IAssetInstanceListResponce>(
        this.baseURL + 'assetinstancesbylocationandmodule/',
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  getAssetpandmAttributesGroups(
    data: any
  ): Observable<IAssetPandMAttributeGroupModelResponce> {
    return this._httpClient
      .post<IAssetPandMAttributeGroupModelResponce>(
        this.baseURL + 'assetpandmattributegroupdata/',
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  getAssetInstanceByParams(data: any): Observable<IAssetInstanceResponce> {
    return this._httpClient
      .post<IAssetInstanceResponce>(
        this.baseURL + 'assetinstancesbyparams/',
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }
  getAssetPAndMAttributesData(assetinstanceid: string): Observable<any> {
    // return this.getDataEntryGroup(String(data.module));
    return forkJoin([
      this.getAssetInstanceById(assetinstanceid),
      this.getAssetpandmAttributesGroups({
        assetInstance: assetinstanceid,
        asset: '0',
      }),
    ]);
  }
  getPumpingStationDetailsReport(data: any): Observable<any> {
    // return this.getDataEntryGroup(String(data.module));
    return forkJoin([
      this.getAssetInstanceByParams(data),
      this.getAssetpandmAttributesGroups(data),
    ]);
  }
}
