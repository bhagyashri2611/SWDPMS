import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AssetModel, IAssetResponce } from '../models/IAsset';

@Injectable({
  providedIn: 'root'
})
export class AssetModulesService {
  API_URL = environment.baseUrl;
baseURL=this.API_URL+"asset/";  
  constructor(private _httpClient: HttpClient) { }
  private handleError(errorResponce: HttpErrorResponse) {
    if (errorResponce.error instanceof ErrorEvent) {
      return  throwError("Client side Error "+errorResponce.message);
    }
    else {
      return  throwError("Server side Error :"+errorResponce.message);
    }
    return throwError("something went wrong");
  }

  getAssets(): Observable<IAssetResponce> {
    return this._httpClient.get<IAssetResponce>(this.baseURL)
      .pipe(catchError(this.handleError));
  }
  getAssetById(assetid:string): Observable<IAssetResponce> {
    console.log(assetid)
    return this._httpClient.get<IAssetResponce>(this.baseURL+assetid)
      .pipe(catchError(this.handleError));
  }
  addAsset(assets: AssetModel): Observable<IAssetResponce> {
    return this._httpClient.post<IAssetResponce>(this.baseURL, JSON.stringify(assets), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }
  updateAsset(assetid:string, assets: AssetModel): Observable<IAssetResponce> {
    return this._httpClient.patch<IAssetResponce>(this.baseURL+assetid, JSON.stringify(assets), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }
  // updateAssetTypeIntance(assets: AssetTypeInstance): Observable<IAssetTypeInstance> {
  //   return this._httpClient.post<IAssetTypeInstance>(this.baseURL + "/assettypeinstance/updateassettypeinstance", JSON.stringify(assets), {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   })
  //     .pipe(catchError(this.handleError));
  // }

  // getAssetTypeInstanceBySupplierID(supplierid: number): Observable<IAssetTypeInstance> {
  //   return this._httpClient.get<IAssetTypeInstance>(this.baseURL + "/assettypeinstance/getassettypeinstancebyuserid?userid=" + supplierid)
  //     .pipe(catchError(this.handleError));
  // }
}
