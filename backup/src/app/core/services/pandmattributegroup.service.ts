import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDataEntryModelResponce, IDataEntryGroupModelResponce, DataEntryModel, IDataEntryGroupsModelResponce } from '../models/IDataEntry';
import { AssetinstanceService } from './assetinstance.service';
import { IAssetPandMAttributeGroupModelResponce } from '../models/IAssetInstance';

@Injectable({
  providedIn: 'root'
})
export class PandmattributegroupService {
  API_URL = environment.baseUrl;
  baseURL = this.API_URL + "pandmattributegroup/";
  constructor(private _httpClient: HttpClient, private assetInstanceService: AssetinstanceService,) { }
  private content = new BehaviorSubject<any>({});
  public dataEntrySearchParams = this.content.asObservable();
  private handleError(errorResponce: HttpErrorResponse) {
    if (errorResponce.error instanceof ErrorEvent) {
      console.log("Client side Error ", errorResponce.error.message)
    }
    else {
      console.log("Server side Error ", errorResponce)
    }
    return throwError("something went wrong");
  }

  //------Data Entry P&M Attribute Group
  getDataentryGroupList(): Observable<IDataEntryGroupsModelResponce> {
    return this._httpClient.get<IDataEntryGroupsModelResponce>(this.baseURL + "dataentrypandmattributegroups/")
      .pipe(catchError(this.handleError));
  }
  addDataEntryGroup(data: any): Observable<IDataEntryGroupsModelResponce> {
    return this._httpClient.post<IDataEntryGroupsModelResponce>(this.baseURL + "dataentrypandmattributegroups/", JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }
  updateDataEntryGroup(id: string, data: any): Observable<IDataEntryGroupsModelResponce> {
    return this._httpClient.patch<IDataEntryGroupsModelResponce>(this.baseURL + "dataentrypandmattributegroup/" + id, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }
  getDataentryGroupByID(id: string): Observable<IDataEntryGroupsModelResponce> {
    return this._httpClient.get<IDataEntryGroupsModelResponce>(this.baseURL + "dataentrypandmattributegroup/" + id)
      .pipe(catchError(this.handleError));
  }
  getDataEntryGroup(data: any): Observable<IDataEntryGroupModelResponce> {
    return this._httpClient.post<IDataEntryGroupModelResponce>(this.baseURL + "dataentrypandmattributegroup/", JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }


  //------Asset P&M Attribute Group
  getAssetPandMAttributeGroupList(): Observable<IAssetPandMAttributeGroupModelResponce> {
    return this._httpClient.get<IAssetPandMAttributeGroupModelResponce>(this.baseURL + "assetpandmattributegroups/")
      .pipe(catchError(this.handleError));
  }
  addAssetPandMAttributeGroup(data: any): Observable<IAssetPandMAttributeGroupModelResponce> {
    return this._httpClient.post<IAssetPandMAttributeGroupModelResponce>(this.baseURL + "assetpandmattributegroups/", JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }
  updateAssetPandMAttributeGroup(id: string, data: any): Observable<IAssetPandMAttributeGroupModelResponce> {
    return this._httpClient.patch<IAssetPandMAttributeGroupModelResponce>(this.baseURL + "assetpandmattributegroup/" + id, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }
  getAssetPandMAttributeByID(id: string): Observable<IAssetPandMAttributeGroupModelResponce> {
    return this._httpClient.get<IAssetPandMAttributeGroupModelResponce>(this.baseURL + "assetpandmattributegroup/" + id)
      .pipe(catchError(this.handleError));
  }
  getAssetPandMAttributeGroup(data: any): Observable<IAssetPandMAttributeGroupModelResponce> {
    return this._httpClient.post<IAssetPandMAttributeGroupModelResponce>(this.baseURL + "assetpandmattributegroupdata/", JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

}
