
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { EmployeeModel, IEmployeeResponce } from '../models/IEmployee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  API_URL = environment.baseUrl;
baseURL=this.API_URL+"employee/"; 
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
saveEmolpyee(data:EmployeeModel): Observable<IEmployeeResponce>{
  return this._httpClient.post<IEmployeeResponce>(this.baseURL, JSON.stringify(data), {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  })
    .pipe(catchError(this.handleError));
}
}
