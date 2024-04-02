import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError ,BehaviorSubject} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  GeoLocationModel,IGeoLocationResponse
} from '../models/IGeoLocation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  API_URL = environment.baseUrl;
  baseURL = this.API_URL + 'geo/';
  //baseURL="http://swm.mcgm.gov.in/rurbanapi/locationservice.svc";
  constructor(private _httpClient: HttpClient) {}
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

  jwtToken = sessionStorage.getItem('jwttoken');
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.jwtToken}`);
  options = { headers: this.headers };


  addGeoLocation(data: GeoLocationModel): Observable<IGeoLocationResponse> {
    return this._httpClient
      .post<IGeoLocationResponse>(this.baseURL+'save', JSON.stringify(data), this.options)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          debugger;
          if (error.status === 204 && error.error.message === 'jwt expired') {
            // Handle JWT token expiration here, for example, you might want to redirect to the login page
            console.log('JWT token expired');
            // Perform actions such as showing a notification or redirecting to the login page
          }
          return throwError(error);
        })
      );
  }


}
