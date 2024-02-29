import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUserResponce, User, SearchUser } from '../models/IUser';
import { ILogin, Login } from '../models/ILogin';
import { ILanguageResponce } from '../models/ILanguage';

import { environment } from 'src/environments/environment';
import { ILocationResponse } from '../models/ILocation';
import { IwardResponce } from '../models/IWard';
// import { FormlyFieldConfig } from '@ngx-formly/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URL = environment.baseUrl;
  baseURL = this.API_URL + 'user/';
  baseURL1 = this.API_URL + 'login/';

  jwtToken = sessionStorage.getItem('jwttoken');
  headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.jwtToken}`);
  options = { headers: this.headers };

  constructor(private _httpClient: HttpClient) {}

  private handleError(errorResponce: HttpErrorResponse) {
    if (errorResponce.error instanceof ErrorEvent) {
      console.log('Client side Error ', errorResponce.error.message);
    } else {
      console.log('Server side Error ', errorResponce);
    }
    return throwError('something went wrong');
  }

  AddUser(users: User): Observable<IUserResponce> {
      return this._httpClient.post<IUserResponce>(this.baseURL, JSON.stringify(users), this.options).pipe(
        catchError((error: HttpErrorResponse) => {
          debugger;
          if (error.status === 204 && error.error.message === 'jwt expired') {
            console.log('JWT token expired');
          }
          return throwError(error);
        })
      );
  }

  updateUser(userid: string, users: User): Observable<IUserResponce> {
    return this._httpClient.patch<IUserResponce>(this.baseURL + userid, JSON.stringify(users), this.options).pipe(
      catchError((error: HttpErrorResponse) => {
        debugger;
        if (error.status === 204 && error.error.message === 'jwt expired') {
          console.log('JWT token expired');
        }
        return throwError(error);
      })
    );
  }

  checkUser(user: User): Observable<IUserResponce> {
    return this._httpClient
      .post<IUserResponce>(this.baseURL + '/checkuser', JSON.stringify(user), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  
  getUsers(): Observable<IUserResponce> {
    return this._httpClient.get<IUserResponce>(this.baseURL, this.options).pipe(
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
  
  adduserlocation(userid: string, users: User): Observable<IUserResponce> {
    return this._httpClient.patch<IUserResponce>( this.baseURL + userid + '/location', JSON.stringify(users), this.options).pipe(
      catchError((error: HttpErrorResponse) => {
        debugger;
        if (error.status === 204 && error.error.message === 'jwt expired') {
          console.log('JWT token expired');
        }
        return throwError(error);
      })
    );
  }

  getUserLocation(userid: string): Observable<IUserResponce> {
      return this._httpClient.get<IUserResponce>(this.baseURL + userid + '/location', this.options).pipe(
      catchError((error: HttpErrorResponse) => {
        debugger;
        if (error.status === 204 && error.error.message === 'jwt expired') {
          console.log('JWT token expired');
        }
        return throwError(error);
      })
    );
  }

  // getUserById(userid: string): Observable<IUserResponce> {
  //   debugger;
  //     return this._httpClient .get<IUserResponce>(this.baseURL + userid, this.options).pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         debugger;
  //         if (error.status === 204 && error.error.message === 'jwt expired') {
  //           console.log('JWT token expired');
  //         }
  //         return throwError(error);
  //       })
  //     );
  // }

  
  getUserById(userid: string): Observable<IUserResponce> {
    return this._httpClient.get<IUserResponce>(this.baseURL + userid)
      .pipe(catchError(this.handleError));
  }


  getUserViewById(userid: string): Observable<IUserResponce> {
    return this._httpClient
      .get<IUserResponce>(this.baseURL + userid)
      .pipe(catchError(this.handleError));
  }

  login(user: any): Observable<IUserResponce> {
    return this._httpClient
      .post<IUserResponce>(this.baseURL1 , JSON.stringify(user), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  
  getWards(): Observable<IwardResponce> {
    return this._httpClient.get<IwardResponce>(this.API_URL+"ward/")
      .pipe(catchError(this.handleError));
  }
}
