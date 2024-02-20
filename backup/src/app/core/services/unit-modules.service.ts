import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UnitModel, IUnitResponce } from '../models/IUnit';

@Injectable({
  providedIn: 'root',
})
export class UnitModulesService {
  API_URL = environment.baseUrl;
  baseURL = this.API_URL + 'unit/';
  constructor(private _httpClient: HttpClient) {}
  private handleError(errorResponce: HttpErrorResponse) {
    if (errorResponce.error instanceof ErrorEvent) {
      console.log('Client side Error ', errorResponce.error.message);
    } else {
      console.log('Server side Error ', errorResponce);
    }
    return throwError('something went wrong');
  }

  getUnits(): Observable<IUnitResponce> {
    return this._httpClient
      .get<IUnitResponce>(this.baseURL)
      .pipe(catchError(this.handleError));
  }
  getUnitById(unitid: string): Observable<IUnitResponce> {
    console.log(unitid);
    return this._httpClient
      .get<IUnitResponce>(this.baseURL + unitid)
      .pipe(catchError(this.handleError));
  }
  addUnit(units: UnitModel): Observable<IUnitResponce> {
    return this._httpClient
      .post<IUnitResponce>(this.baseURL, JSON.stringify(units), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  checkUnit(units: UnitModel): Observable<IUnitResponce> {
    return this._httpClient
      .post<IUnitResponce>(this.baseURL + '/checkunit', JSON.stringify(units), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  updateUnit(unitid: string, units: UnitModel): Observable<IUnitResponce> {
    return this._httpClient
      .patch<IUnitResponce>(this.baseURL + unitid, JSON.stringify(units), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }
}
