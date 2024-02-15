import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatelocationComponent } from './createlocation/createlocation.component';
import { LocationlistComponent } from './locationlist/locationlist.component';
import { ModulesInLocationComponent } from './modules-in-location/modules-in-location.component';
import { ModuledetailComponent } from './moduledetail/moduledetail.component';

const routes: Routes = [
  { path: 'create', component: CreatelocationComponent },
  { path: 'list', component: LocationlistComponent },
  { path: 'create/:id', component: CreatelocationComponent },
  { path: 'attachmodule/:id', component: ModulesInLocationComponent },
  { path: 'addmoduledetails/:id', component: ModuledetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationmasterRoutingModule {}
