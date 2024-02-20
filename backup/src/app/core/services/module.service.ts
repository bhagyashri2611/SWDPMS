import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IModuleResponce, ModuleModel } from '../models/IModule';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  API_URL = environment.baseUrl;
  baseURL = this.API_URL + 'module/';
  // baseURL=this.API_URL+"userservice.svc/user";

  constructor(private _httpClient: HttpClient) {}
  private handleError(errorResponce: HttpErrorResponse) {
    if (errorResponce.error instanceof ErrorEvent) {
      console.log('Client side Error ', errorResponce.error.message);
    } else {
      console.log('Server side Error ', errorResponce);
    }
    return throwError('something went wrong');
  }
  getModules(): Observable<IModuleResponce> {
    return this._httpClient
      .get<IModuleResponce>(this.baseURL)
      .pipe(catchError(this.handleError));
  }
  getModuleByID(moduleId: any): Observable<IModuleResponce> {
    return this._httpClient
      .get<IModuleResponce>(this.baseURL + moduleId)
      .pipe(catchError(this.handleError));
  }

  checkModule(module: ModuleModel): Observable<IModuleResponce> {
    return this._httpClient
      .post<IModuleResponce>(
        this.baseURL + '/checkmodule',
        JSON.stringify(module),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }
  AddModule(data: ModuleModel): Observable<IModuleResponce> {
    return this._httpClient
      .post<IModuleResponce>(this.baseURL, JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }
  updateModule(
    moduleId: string,
    data: ModuleModel
  ): Observable<IModuleResponce> {
    return this._httpClient
      .patch<IModuleResponce>(this.baseURL + moduleId, JSON.stringify(data), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }
  attachAssets(
    moduleId: string,
    data: ModuleModel
  ): Observable<IModuleResponce> {
    return this._httpClient
      .patch<IModuleResponce>(
        this.baseURL + '/attachasset/' + moduleId,
        JSON.stringify(data),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }
  getAssetsByModulesInLocationID(moduleId: any): Observable<IModuleResponce> {
    return this._httpClient
      .get<IModuleResponce>(this.baseURL + moduleId)
      .pipe(catchError(this.handleError));
  }
}
