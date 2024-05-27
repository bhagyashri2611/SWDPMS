import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatelocationComponent } from './createlocation/createlocation.component';
import { LocationlistComponent } from './locationlist/locationlist.component';
import { ModulesInLocationComponent } from './modules-in-location/modules-in-location.component';
import { ModuledetailComponent } from './moduledetail/moduledetail.component';
import { AssetpandmattributelistComponent } from '../pandmattribute/assetpandmattributelist/assetpandmattributelist.component';
import { PandmattributelistComponent } from '../pandmattribute/pandmattributelist/pandmattributelist.component';
import { CreatepandmattributeComponent } from '../pandmattribute/createpandmattribute/createpandmattribute.component';
import { DataentrypandattributegrouplistComponent } from '../pandmattribute/dataentrypandattributegrouplist/dataentrypandattributegrouplist.component';
import { DataentrypandattributegroupComponent } from '../pandmattribute/dataentrypandattributegroup/dataentrypandattributegroup.component';
import { CreatedataentryComponent } from '../dataentry/createdataentry/createdataentry.component';
import { GeneratedataentrypageComponent} from '../dataentry/generatedataentrypage/generatedataentrypage.component';
import { NumberWidgetComponent} from '../../CustomViews/dashboard-widgets/number-widget/number-widget.component'
import { TaskDetailsComponent} from '../rwmsreports/task-details/task-details.component'
import { ContractorRemarksComponent } from '../rwmsreports/contractor-remarks/contractor-remarks.component';
import { ZoneWiseReportComponent } from '../rwmsreports/zone-wise-report/zone-wise-report.component';
import { WardWiseReportComponent } from '../rwmsreports/ward-wise-report/ward-wise-report.component';
import { ConWiseReportComponent } from '../rwmsreports/con-wise-report/con-wise-report.component';
import { RoadWiseReportComponent } from '../rwmsreports/road-wise-report/road-wise-report.component';
import { LocationDataEntryComponent } from '../rwmsreports/location-data-entry/location-data-entry.component';
import { MasticWorkListComponent } from '../mastic-work/mastic-work-list/mastic-work-list.component';
import { MasticRoadListComponent } from './mastic-road-list/mastic-road-list.component';
import { MasticRoadDataEntryComponent } from './mastic-road-data-entry/mastic-road-data-entry.component';
import { MegaCcRoadsComponent } from './mega-cc-roads/mega-cc-roads.component';
import { NonMegaCcRoadsComponent } from './non-mega-cc-roads/non-mega-cc-roads.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: 'create', component: CreatelocationComponent },
  { path: 'list', component: LocationlistComponent },
  { path: 'create/:id', component: CreatelocationComponent },
  { path: 'attachmodule/:id', component: ModulesInLocationComponent },
  { path: 'addmoduledetails/:id', component: ModuledetailComponent },
  {path:"assetpandmattributelist", component:AssetpandmattributelistComponent},
  {path:"dataentryassetpandmattributelist", component:PandmattributelistComponent},
  {path:"createdataentrypandm", component:CreatepandmattributeComponent},
  {path:"createdataentrypandm/:id", component:CreatepandmattributeComponent},
  {path:"dataentrygrouplist", component:DataentrypandattributegrouplistComponent},
  {path:"dataentrypandmgroup",component:DataentrypandattributegroupComponent},
  {path:"dataentrypandmgroup/:id",component:DataentrypandattributegroupComponent},
  {path:"createdataentry",component:CreatedataentryComponent},
  {path:"screendataentry",component:GeneratedataentrypageComponent},     
  {path:"numberdWidget",component:NumberWidgetComponent}, 
  {path:"report/taskdetailsreport",component:TaskDetailsComponent}, 
  {path:"report/contractorremarksreport",component:ContractorRemarksComponent}, 
  {path:"masticroadlist",component: MasticRoadListComponent},
  { path: 'megacclist', component: MegaCcRoadsComponent },
  { path: 'nonmegacclist', component: NonMegaCcRoadsComponent },
  {path:"report/zonewisereport",component: ZoneWiseReportComponent}, 
  {path:"report/wardwisereport",component: WardWiseReportComponent}, 
  {path:"report/contractorwisereport",component: ConWiseReportComponent}, 
  {path:"report/roadwisereport",component: RoadWiseReportComponent},
  {path:"report/locationdataentry",component: LocationDataEntryComponent},
  {path:"masticworklist",component: MasticWorkListComponent},
  {path:"payment",component: PaymentComponent},
  {path:"createMasticRoad",component: MasticRoadDataEntryComponent}, // added for routing by rucha
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationmasterRoutingModule {}
