import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { MinorProgressPreMansoonComponent } from './minor-progress-pre-mansoon/minor-progress-pre-mansoon.component';
import { MinorProgressDuringMansoonComponent } from './minor-progress-during-mansoon/minor-progress-during-mansoon.component';
import { MajorProgressPreMansoonComponent } from './major-progress-pre-mansoon/major-progress-pre-mansoon.component';
import { MajorProgressDuringMansoonComponent } from './major-progress-during-mansoon/major-progress-during-mansoon.component';
import { ViewmoreComponent } from './reports/viewmore/viewmore.component';
import { ViewDetailsComponent } from './reports/view-details/view-details.component';
import { LoadingtripsComponent } from './loadingtrips/loadingtrips.component';
import { AddnallavideosComponent } from './addnallavideos/addnallavideos.component';

const routes: Routes = [
  { path: '', component: ReportsComponent },
  { path: 'exporttoexcel', component: ExportToExcelComponent },
  { path: 'slitqualitity', component: SlitQualitityComponent },
  {
    path: 'CumulativeMajorNallahReport',
    component: CumulativeMajorNallahReportComponent,
  },
  {
    path: 'CumulativeMinorNallahReport',
    component: CumulativeMinorNallahReportComponent,
  },
  { path: 'WorkcodeWiseReport', component: WorkcodeWiseReportComponent },
  { path: 'BillableSiltReport', component: BillableSiltReportComponent },
  { path: 'TripwiseSiltReport', component: TripwiseSiltReportComponent },
  { path: 'ViewSiteVehicleImage', component: ViewSiteVehicleImageComponent },
  {
    path: 'ViewNallahLoadingVideos',
    component: ViewNallahLoadingVideosComponent,
  },
  {
    path: 'MajorProgressPreMansoonReport',
    component: MajorProgressPreMansoonComponent,
  },
  {
    path: 'MajorProgressDuringMansoonReport',
    component: MajorProgressDuringMansoonComponent,
  },
  {
    path: 'MinorProgressPreMansoonReport',
    component: MinorProgressPreMansoonComponent,
  },
  {
    path: 'MinorProgressDuringMansoonReport',
    component: MinorProgressDuringMansoonComponent,
  },
  { path: 'viewmore', component: ViewmoreComponent },
  { path: 'viewdetails', component: ViewDetailsComponent },
  { path: 'loadingtrips', component: LoadingtripsComponent },
  { path: 'addnallavideo', component: AddnallavideosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
