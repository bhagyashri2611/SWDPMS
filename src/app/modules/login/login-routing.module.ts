import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserloginComponent } from './userlogin/userlogin.component';

const routes: Routes = [
  { path: 'login', component: UserloginComponent },
  { path: 'adminlogin', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
