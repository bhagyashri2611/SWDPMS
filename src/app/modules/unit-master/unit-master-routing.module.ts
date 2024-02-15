import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { UnitListComponent } from './unit-list/unit-list.component';

const routes: Routes = [
  { path: 'create', component: CreateUnitComponent },
  { path: 'create/:id', component: CreateUnitComponent },
  { path: 'list', component: UnitListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitMasterRoutingModule {}
