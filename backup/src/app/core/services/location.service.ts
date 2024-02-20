import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IGroupLocationResponse, ILocationResponse, LocationModel } from '../models/ILocation';
import { environment } from 'src/environments/environment';
import { IModulesInLocationResponse, ModulesInLocationObjectModel, ModulesInLocationObjectModelList } from '../models/IModules-In-Location';
import { IwardResponce } from '../models/IWard';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  API_URL = environment.baseUrl;
  baseURL = this.API_URL + "location/";
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
  getAllModulInLocation(): Observable<IModulesInLocationResponse> {
    return this._httpClient.get<IModulesInLocationResponse>(this.baseURL  + "getlocationmodule")
      .pipe(catchError(this.handleError));
  }
  //Get All Locations 
  getUrls(): Observable<ILocationResponse> {
    return this._httpClient.get<ILocationResponse>(this.baseURL)
      .pipe(catchError(this.handleError));
  }
  //Get All Locations 
  getLocations(): Observable<ILocationResponse> {
    return this._httpClient.get<ILocationResponse>(this.baseURL)
      .pipe(catchError(this.handleError));
  }


  getWards(): Observable<IwardResponce> {
    return this._httpClient.get<IwardResponce>(this.API_URL+"ward/")
      .pipe(catchError(this.handleError));
  }

 
  //Get Location by location id
  getLocationById(locationid: any): Observable<ILocationResponse> {
    return this._httpClient.get<ILocationResponse>(this.baseURL + locationid)
      .pipe(catchError(this.handleError));
  }

  //Add Location
  addLocation(data: LocationModel): Observable<ILocationResponse> {
    return this._httpClient.post<ILocationResponse>(this.baseURL, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  //Update Location
  updateLocation(locationid: any, data: LocationModel): Observable<ILocationResponse> {
    return this._httpClient.patch<ILocationResponse>(this.baseURL + locationid, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  //Get Location by location id
  getModulesInLocation(locationid: any): Observable<IModulesInLocationResponse> {
    return this._httpClient.get<IModulesInLocationResponse>(this.baseURL + locationid + "/modules")
      .pipe(catchError(this.handleError));
  }
  //Get Location by location id
  getModulesInLocationByID(moduleinlocationid: any): Observable<IModulesInLocationResponse> {
    return this._httpClient.get<IModulesInLocationResponse>(this.baseURL + moduleinlocationid + "/getmoduleinlocation")
      .pipe(catchError(this.handleError));
  }
  //Update Location
  addModulesInLocation(locationid: any, data: any): Observable<IModulesInLocationResponse> {
    return this._httpClient.patch<IModulesInLocationResponse>(this.baseURL + locationid + "/modules", JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  
  addModuleDetails(moduleid: any, data: any): Observable<IModulesInLocationResponse> {
    return this._httpClient.patch<IModulesInLocationResponse>(this.baseURL + moduleid + "/moduledetails", JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }


  //Get Location by user id  
  getLocationByUser(): Observable<ILocationResponse> {
   const uid = sessionStorage.getItem("userid")
   console.log(uid)
    return this._httpClient.get<ILocationResponse>(this.baseURL + uid+"/locations")
      .pipe(catchError(this.handleError));
  }

    //Get Location by user id
  
    getGroupLocationByUser(): Observable<IGroupLocationResponse> {
      const uid = sessionStorage.getItem("userid")
      console.log(uid)
       return this._httpClient.get<IGroupLocationResponse>(this.baseURL +"/getgrouppumpingstations")
         .pipe(catchError(this.handleError));
     }



}
