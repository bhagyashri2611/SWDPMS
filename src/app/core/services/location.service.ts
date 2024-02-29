import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IGroupLocationResponse, ILocationResponse, LocationModel } from '../models/ILocation';
import { environment } from 'src/environments/environment';
import { IModulesInLocationResponse, ModulesInLocationObjectModel, ModulesInLocationObjectModelList } from '../models/IModules-In-Location';
import { IwardResponce } from '../models/IWard';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  API_URL = environment.baseUrl;
  baseURL = this.API_URL + 'location/';
  //baseURL="http://swm.mcgm.gov.in/rurbanapi/locationservice.svc";
  constructor(private _httpClient: HttpClient) {}
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

  //Get All getAllModulInLocation added jwt
  getAllModulInLocation(): Observable<IModulesInLocationResponse> {
    // return this._httpClient.get<IModulesInLocationResponse>(this.baseURL + 'getlocationmodule')
    //   .pipe(catchError(this.handleError));

    return this._httpClient.get<IModulesInLocationResponse>(this.baseURL + 'getlocationmodule', this.options).pipe(
      catchError((error: HttpErrorResponse) => {
        debugger;
        if (error.status === 204 && error.error.message === 'jwt expired') {
          console.log('JWT token expired');
        }
        return throwError(error);
      })
    );
  }
  //Get All Locations
  getUrls(): Observable<ILocationResponse> {
    return this._httpClient
      .get<ILocationResponse>(this.baseURL)
      .pipe(catchError(this.handleError));
  }
  //Get All Locations added jwt
  getLocations(): Observable<ILocationResponse> {
    // return this._httpClient.get<ILocationResponse>(this.baseURL)
    //   .pipe(catchError(this.handleError));

    return this._httpClient.get<ILocationResponse>(this.baseURL, this.options).pipe(
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

  getWards(): Observable<IwardResponce> {
    return this._httpClient.get<IwardResponce>(this.API_URL+"ward/")
      .pipe(catchError(this.handleError));
  }

  //Get Location by location id  added jwt
  getLocationById(locationid: any): Observable<ILocationResponse> {
    return this._httpClient.get<ILocationResponse>(this.baseURL + locationid, this.options).pipe(
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

  //Add Location aaded jwt
  addLocation(data: LocationModel): Observable<ILocationResponse> {
    return this._httpClient.post<ILocationResponse>(this.baseURL, JSON.stringify(data), this.options).pipe(
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

  //Update Location added jwt
  updateLocation(locationid: any, data: LocationModel): Observable<ILocationResponse> {
    return this._httpClient.patch<ILocationResponse>(this.baseURL + locationid,JSON.stringify(data), this.options).pipe(
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

  //Get Location by location id   added jwt
  getModulesInLocation(locationid: any): Observable<IModulesInLocationResponse> {
    return this._httpClient.get<IModulesInLocationResponse>(this.baseURL + locationid + "/modules", this.options).pipe(
      catchError((error: HttpErrorResponse) => {
        debugger;
        if (error.status === 204 && error.error.message === 'jwt expired') {
          console.log('JWT token expired');
        }
        return throwError(error);
      })
    );
  }

  //Get Location by location id added jwt
  getModulesInLocationByID(moduleinlocationid: any): Observable<IModulesInLocationResponse> {
    return this._httpClient.get<IModulesInLocationResponse>( this.baseURL + moduleinlocationid + '/getmoduleinlocation', this.options).pipe(
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
  // addModulesInLocation added jwt
  addModulesInLocation(locationid: any, data: any): Observable<IModulesInLocationResponse> {
    return this._httpClient.patch<IModulesInLocationResponse>(this.baseURL + locationid + '/modules', JSON.stringify(data), this.options).pipe(
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

  addModuleDetails(moduleid: any,data: any): Observable<IModulesInLocationResponse> {
    return this._httpClient.patch<IModulesInLocationResponse>(this.baseURL + moduleid + "/moduledetails", JSON.stringify(data), this.options).pipe(
        catchError((error: HttpErrorResponse) => {
          debugger;
          if (error.status === 204 && error.error.message === 'jwt expired') {
            console.log('JWT token expired');
          }
          return throwError(error);
        })
      );
  }
 
  //Get Location by user id  added jwt
  getLocationByUser(): Observable<ILocationResponse> {
    const uid = sessionStorage.getItem('UserId');
    console.log(uid)

    return this._httpClient.get<ILocationResponse>(this.baseURL + uid+"/locations", this.options).pipe(
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

  //Get Location by user id added jwt

  getGroupLocationByUser(): Observable<IGroupLocationResponse> {
    const uid = sessionStorage.getItem('userid');
    console.log(uid);

    return this._httpClient.get<IGroupLocationResponse>(this.baseURL + '/getgrouppumpingstations', this.options).pipe(
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
