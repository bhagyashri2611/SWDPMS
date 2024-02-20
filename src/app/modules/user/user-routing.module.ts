import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateuserComponent } from './createuser/createuser.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserlocationComponent } from './userlocation/userlocation.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

const routes: Routes = [
  { path: 'create', component: CreateuserComponent },
  { path: 'create/:id', component: CreateuserComponent },
  { path: 'list', component: UserlistComponent },
  { path: 'attachlocation/:id', component: UserlocationComponent },
  { path: 'changepassword/:id', component: ChangepasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
