import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AlertModule, ButtonModule, FormModule, GridModule, NavModule, TabsModule } from '@coreui/angular';
import { AgGridModule } from '@ag-grid-community/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VehiclesComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,

    FormsModule,
    FormModule,
    AgGridModule,
    GridModule,
    ReactiveFormsModule,

    AlertModule,   
    TabsModule, 
    NavModule,
    ButtonModule, 
  ]
})
export class MasterModule { }
