import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetpandmattributelistComponent } from './assetpandmattributelist/assetpandmattributelist.component';

const routes: Routes = [
  {
    path:"pandmattribute",
    children:[
      // {path:"create", component:CreatepandmattributeComponent},
      // {path:"create/:id", component:CreatepandmattributeComponent},
      // {path:"list", component:PandmattributelistComponent},
      // {path:"assetpandmattributes", component:AssetpandmattributesComponent},
      // {path:"assetpandmattributes/:id", component:AssetpandmattributesComponent},
      {path:"assetpandmattributelist", component:AssetpandmattributelistComponent},
      //{path:'attachlocation/:id', component:UserlocationComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PandmattributeRoutingModule { }
