import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RWMSReportsRoutingModule } from './rwmsreports-routing.module';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { ContractorRemarksComponent } from './contractor-remarks/contractor-remarks.component';
import {DashboardWidgetsModule} from '../../CustomViews/dashboard-widgets/dashboard-widgets.module'
@NgModule({
  declarations: [
    TaskDetailsComponent,
    ContractorRemarksComponent
  ],
  imports: [
    DashboardWidgetsModule,
    CommonModule,
    RWMSReportsRoutingModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    NavModule,
    ProgressModule,
    TableModule,
    TabsModule,
    IconModule,
    ChartjsModule,
    ReactiveFormsModule,
    AgGridModule
  ]
})
export class RWMSReportsModule { }
