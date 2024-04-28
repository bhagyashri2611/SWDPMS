import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasticWorkDataEntryComponent } from './mastic-work-data-entry/mastic-work-data-entry.component';
import { MasticWorkListComponent } from './mastic-work-list/mastic-work-list.component';

const routes: Routes = [
  { path: 'create', component: MasticWorkDataEntryComponent },
  { path: 'list', component: MasticWorkListComponent },
  { path: 'create/:id', component: MasticWorkDataEntryComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasticWorkRoutingModule { }
