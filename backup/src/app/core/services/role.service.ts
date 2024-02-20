import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { roleModel, IroleResponce } from '../models/IRole';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  API_URL = environment.baseUrl;
  baseURL = this.API_URL + "role/";
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

  getRoles(): Observable<IroleResponce> {
    return this._httpClient.get<IroleResponce>(this.baseURL)
      .pipe(catchError(this.handleError));
  }

  getRoleById(roleid:string): Observable<IroleResponce> {
    console.log(roleid)
    return this._httpClient.get<IroleResponce>(this.baseURL+roleid)
      .pipe(catchError(this.handleError));
  }

  addRole(roles: roleModel): Observable<IroleResponce> {
    return this._httpClient.post<IroleResponce>(this.baseURL, JSON.stringify(roles), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }


}
