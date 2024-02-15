import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AutoLogoutService } from '../services/autologout.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router,) {}
  isLogin:boolean=false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    
     this.isLogin=this.authService.isLogisLoggedInin();
      // this.authService.isLogisLoggedInin.subscribe(res => {private serviceAL: AutoLogoutService
      //   if(res){
      //     this.isLogin=res;         
      //     return this.isLogin
      //   }else
      //   {
      //     this.isLogin=res;        
      //     return  this.router.navigate(['login']);;
      //     //return false;
      //   }
        //console.log(this.authService.isLogisLoggedInin());
      // })
    //  let val=this.serviceAL.val;
      if(this.isLogin){
        return this.isLogin;        
      }else{
        this.router.navigate(['login'])
      }
      
     return this.authService.isLogisLoggedInin()
     
  }
  
}
