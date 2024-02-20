import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PandmattributeRoutingModule } from './pandmattribute-routing.module';
import { AssetpandmattributelistComponent } from './assetpandmattributelist/assetpandmattributelist.component';
import { PandmattributelistComponent } from './pandmattributelist/pandmattributelist.component';
import { AgGridModule } from 'ag-grid-angular';

import { IconModule } from '@coreui/icons-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BtnCellRenderer } from './pandmattributelist/button-cell-renderer.component';
import {
  AccordionModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonModule,
  CardModule,
  CarouselModule,
  CollapseModule,
  DropdownModule,
  FormModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  PopoverModule,
  ProgressModule,
  SharedModule,
  SpinnerModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule,
} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreatepandmattributeComponent } from './createpandmattribute/createpandmattribute.component';
import { DataentrypandattributegrouplistComponent } from './dataentrypandattributegrouplist/dataentrypandattributegrouplist.component';
import { DataentrypandattributegroupComponent } from './dataentrypandattributegroup/dataentrypandattributegroup.component';

@NgModule({
  declarations: [
    AssetpandmattributelistComponent,
    PandmattributelistComponent,
    BtnCellRenderer,
    CreatepandmattributeComponent,
    DataentrypandattributegrouplistComponent,
    DataentrypandattributegroupComponent,
  ],
  imports: [
    CommonModule,
    PandmattributeRoutingModule,
    AgGridModule,
    IconModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    DragDropModule,
    CardModule,
    CarouselModule,
    CollapseModule,
    DropdownModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    ListGroupModule,
    NavModule,
    PaginationModule,
    PlaceholderModule,
    PopoverModule,
    ProgressModule,
    SharedModule,
    SpinnerModule,
    TableModule,
    TabsModule,
    TooltipModule,
    UtilitiesModule,
    
  ]
})
export class PandmattributeModule { }
