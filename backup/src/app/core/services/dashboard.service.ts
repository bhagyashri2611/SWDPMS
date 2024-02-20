import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDashboardResponce, ISqlAutoDataResponce } from '../models/IDashboard';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  API_URL = environment.baseUrl;
  // baseURL="http://swm.mcgm.gov.in/rurbanapi/userservice.svc/user";  
  baseURL = this.API_URL + "dashboard/";

  constructor(private _httpClient: HttpClient) { }
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

  
  getWidgetData(): Observable<IDashboardResponce> {
    return this._httpClient.get<IDashboardResponce>(this.baseURL)
      .pipe(catchError(this.handleError));
  }
  getWWTFData(): Observable<ISqlAutoDataResponce> {
    return this._httpClient.get<ISqlAutoDataResponce>(this.baseURL+"wwtf/")
      .pipe(catchError(this.handleError));
  }
}
