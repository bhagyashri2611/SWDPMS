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
import {DashboardWidgetsModule} from '../../CustomViews/dashboard-widgets/dashboard-widgets.module';
import { ZoneWiseReportComponent } from './zone-wise-report/zone-wise-report.component';
import { WardWiseReportComponent } from './ward-wise-report/ward-wise-report.component';
import { ConWiseReportComponent } from './con-wise-report/con-wise-report.component';
import { RoadWiseReportComponent } from './road-wise-report/road-wise-report.component';
import { LocationDataEntryComponent } from './location-data-entry/location-data-entry.component'
@NgModule({
  declarations: [
    TaskDetailsComponent,
    ContractorRemarksComponent,
    ZoneWiseReportComponent,
    WardWiseReportComponent,
    ConWiseReportComponent,
    RoadWiseReportComponent,
    LocationDataEntryComponent
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
