import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ILocationResponse, LocationModel } from '../models/ILocation';
import { environment } from 'src/environments/environment';
import { INavigationUrlCollectionResponce } from '../models/INavigationUrl';
@Injectable({
  providedIn: 'root'
})
export class NavigationurlService {
  API_URL = environment.baseUrl;
  baseURL = this.API_URL + "navigationurl/";
  //baseURL="http://swm.mcgm.gov.in/rurbanapi/locationservice.svc"; 
  constructor(private _httpClient: HttpClient) { }
  private handleError(errorResponce: HttpErrorResponse) {
    if (errorResponce.error instanceof ErrorEvent) {
      console.log("Client side Error ", errorResponce.error.message)
    }
    else {
      console.log("Server side Error ", errorResponce)
    }
    return throwError("something went wrong");
  }

  //Get All Urls 
  getUrls(): Observable<INavigationUrlCollectionResponce> {
    return this._httpClient.get<INavigationUrlCollectionResponce>(this.baseURL)
      .pipe(catchError(this.handleError));
  }
}
