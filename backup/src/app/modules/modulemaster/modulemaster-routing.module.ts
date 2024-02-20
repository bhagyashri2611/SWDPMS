import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulelistComponent } from './modulelist/modulelist.component';
import { CreatemoduleComponent } from './createmodule/createmodule.component';

const routes: Routes = [
  {
    path: 'list',
    component: ModulelistComponent,
  },
  {
    path: 'create',
    component: CreatemoduleComponent,
  },
  {
    path: 'create/:id',
    component: CreatemoduleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModulemasterRoutingModule {}
