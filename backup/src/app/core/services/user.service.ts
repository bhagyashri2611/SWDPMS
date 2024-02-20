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
    return this._httpClient
      .post<IUserResponce>(this.baseURL, JSON.stringify(users), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  }

  updateUser(userid: string, users: User): Observable<IUserResponce> {
    return this._httpClient
      .patch<IUserResponce>(this.baseURL + userid, JSON.stringify(users), {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
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
    return this._httpClient
      .get<IUserResponce>(this.baseURL)
      .pipe(catchError(this.handleError));
  }

  adduserlocation(userid: string, users: User): Observable<IUserResponce> {
    return this._httpClient
      .patch<IUserResponce>(
        this.baseURL + userid + '/location',
        JSON.stringify(users),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  getUserLocation(userid: string): Observable<IUserResponce> {
    return this._httpClient
      .get<IUserResponce>(this.baseURL + userid + '/location')
      .pipe(catchError(this.handleError));
  }

  getUserById(userid: string): Observable<IUserResponce> {
    return this._httpClient
      .get<IUserResponce>(this.baseURL + userid)
      .pipe(catchError(this.handleError));
  }

  getUserViewById(userid: string): Observable<IUserResponce> {
    return this._httpClient
      .get<IUserResponce>(this.baseURL + userid)
      .pipe(catchError(this.handleError));
  }

  login(user: any): Observable<IUserResponce> {
    return this._httpClient
      .post<IUserResponce>(this.baseURL + 'login', JSON.stringify(user), {
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
