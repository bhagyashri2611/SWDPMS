import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ExportToExcelComponent } from './export-to-excel/export-to-excel.component';
import { ReportsComponent } from './reports/reports.component';
import { SlitQualitityComponent } from './slit-qualitity/slit-qualitity.component';
import { CumulativeMajorNallahReportComponent } from './cumulative-major-nallah-report/cumulative-major-nallah-report.component';
import { CumulativeMinorNallahReportComponent } from './cumulative-minor-nallah-report/cumulative-minor-nallah-report.component';
import { WorkcodeWiseReportComponent } from './workcode-wise-report/workcode-wise-report.component';
import { BillableSiltReportComponent } from './billable-silt-report/billable-silt-report.component';
import { TripwiseSiltReportComponent } from './tripwise-silt-report/tripwise-silt-report.component';
import { ViewSiteVehicleImageComponent } from './view-site-vehicle-image/view-site-vehicle-image.component';
import { ViewNallahLoadingVideosComponent } from './view-nallah-loading-videos/view-nallah-loading-videos.component';

import { MajorProgressPreMansoonComponent } from './major-progress-pre-mansoon/major-progress-pre-mansoon.component';
import { MajorProgressDuringMansoonComponent } from './major-progress-during-mansoon/major-progress-during-mansoon.component';
import { MinorProgressPreMansoonComponent } from './minor-progress-pre-mansoon/minor-progress-pre-mansoon.component';
import { MinorProgressDuringMansoonComponent } from './minor-progress-during-mansoon/minor-progress-during-mansoon.component';
import { LoadingtripsComponent } from './loadingtrips/loadingtrips.component';

import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BtnCellRenderer } from './reports/button-cell-renderer.component';
import { BtnLinkCellRenderer } from './reports/buttonLink-cell-renderer.component';
import { BtnViewCellRenderer } from './reports/buttonView-cell-renderer.component';
import { BtnMoreCellRenderer } from './reports/buttonMore-cell-renderer.component';
import {
  AlertModule,
  BadgeModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  ModalModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  ToastModule,
  TooltipModule,
  UtilitiesModule,
  TabsModule,
  NavModule,
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
import { ViewDetailsComponent } from './reports/view-details/view-details.component';
import { ViewmoreComponent } from './reports/viewmore/viewmore.component';
import { CumulativehighwayreportComponent } from './cumulativehighwayreport/cumulativehighwayreport.component';
import { BrowserModule } from '@angular/platform-browser';
import { AddnallavideosComponent } from './addnallavideos/addnallavideos.component';

@NgModule({
  declarations: [
    ExportToExcelComponent,
    ReportsComponent,
    SlitQualitityComponent,
    CumulativeMajorNallahReportComponent,
    CumulativeMinorNallahReportComponent,
    WorkcodeWiseReportComponent,
    BillableSiltReportComponent,
    TripwiseSiltReportComponent,
    ViewSiteVehicleImageComponent,
    ViewNallahLoadingVideosComponent,

    MajorProgressPreMansoonComponent,
    MajorProgressDuringMansoonComponent,
    MinorProgressPreMansoonComponent,
    MinorProgressDuringMansoonComponent,
    LoadingtripsComponent,
    BtnCellRenderer,
    BtnLinkCellRenderer,
    BtnViewCellRenderer,
    ViewDetailsComponent,
    ViewmoreComponent,
    CumulativehighwayreportComponent,
    AddnallavideosComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormModule,
    ReportRoutingModule,
    AgGridModule,
    AlertModule,
    TabsModule,
    NavModule,
    ButtonModule,
  ],
})
export class ReportModule {}
