import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IPandMAttributeResponce, PandMAttribute } from '../models/IPandMAttribute';
//import { ILogin, Login } from '../models/ILogin';
//import { ILanguageResponce } from '../models/ILanguage';

import { environment } from 'src/environments/environment';
//import { ILocationResponse } from '../models/ILocation';
// import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({
  providedIn: 'root'
})
export class PandmattributeService {
  API_URL = environment.baseUrl;
  baseURL = this.API_URL + "pandmattribute/";

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

  AddPandMAttribute(pandmattribute: PandMAttribute): Observable<IPandMAttributeResponce> {
    return this._httpClient.post<IPandMAttributeResponce>(this.baseURL, JSON.stringify(pandmattribute), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  updatePandMAttribute(attributeid: string, pandmattribute: PandMAttribute): Observable<IPandMAttributeResponce> {
    return this._httpClient.patch<IPandMAttributeResponce>(this.baseURL + attributeid, JSON.stringify(pandmattribute), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  getPandMAttribute(): Observable<IPandMAttributeResponce> {
    return this._httpClient.get<IPandMAttributeResponce>(this.baseURL)
      .pipe(catchError(this.handleError));
  }


  getPandMAttributeById(attributeid: string): Observable<IPandMAttributeResponce> {
    return this._httpClient.get<IPandMAttributeResponce>(this.baseURL + attributeid)
      .pipe(catchError(this.handleError));
  }


 // --- Asset P&M attributes 

 AddAssetPandMAttribute(pandmattribute: PandMAttribute): Observable<IPandMAttributeResponce> {
  return this._httpClient.post<IPandMAttributeResponce>(this.baseURL+"assetpandmattributes/", JSON.stringify(pandmattribute), {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  })
    .pipe(catchError(this.handleError));
}

updateAssetPandMAttribute(attributeid: string, pandmattribute: PandMAttribute): Observable<IPandMAttributeResponce> {
  return this._httpClient.patch<IPandMAttributeResponce>(this.baseURL+"assetpandmattribute/" + attributeid, JSON.stringify(pandmattribute), {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  })
    .pipe(catchError(this.handleError));
}

getAssetPandMAttribute(): Observable<IPandMAttributeResponce> {
  return this._httpClient.get<IPandMAttributeResponce>(this.baseURL+"assetpandmattributes/")
    .pipe(catchError(this.handleError));
}


getAssetPandMAttributeById(attributeid: string): Observable<IPandMAttributeResponce> {
  return this._httpClient.get<IPandMAttributeResponce>(this.baseURL+"assetpandmattribute/" + attributeid)
    .pipe(catchError(this.handleError));
}

}
