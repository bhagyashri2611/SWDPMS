import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //isLogisLoggedInin = new BehaviorSubject<boolean>(false);
  constructor(private router: Router) { }

  isLogisLoggedInin(): boolean {
    if (sessionStorage.getItem('UserId') != null) {
      return true;
    } else {
      return false;
    }
  }

}
