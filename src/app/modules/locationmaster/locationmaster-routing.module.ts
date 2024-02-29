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



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationmasterRoutingModule {}
