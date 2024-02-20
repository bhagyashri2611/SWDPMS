import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateuserComponent } from './createuser/createuser.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserlocationComponent } from './userlocation/userlocation.component';

const routes: Routes = [
  { path: 'create', component: CreateuserComponent },
  { path: 'create/:id', component: CreateuserComponent },
  { path: 'list', component: UserlistComponent },
  { path: 'attachlocation/:id', component: UserlocationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
