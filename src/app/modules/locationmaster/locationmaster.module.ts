import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { IconModule } from '@coreui/icons-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LocationmasterRoutingModule } from './locationmaster-routing.module';
import { CreatelocationComponent } from './createlocation/createlocation.component';
import { LocationlistComponent } from './locationlist/locationlist.component';
import { BtnCellRenderer } from './locationlist/button-cell-renderer.component';
import { MegaCCBtnCellRenderer } from './mega-cc-roads/button-cell-renderer.component';
import { NonMegaCCBtnCellRenderer } from './non-mega-cc-roads/button-cell-renderer.component';

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
import { ModulesInLocationComponent } from './modules-in-location/modules-in-location.component';
import { ModuledetailComponent } from './moduledetail/moduledetail.component';
import { BtnSaveCellRenderer } from './moduledetail/button-save-renderer.component';
import { BtnConSaveCellRenderer } from './moduledetail/button-con-save-renderer.component';
import { MasticRoadListComponent } from './mastic-road-list/mastic-road-list.component';
import { MasticRoadDataEntryComponent } from './mastic-road-data-entry/mastic-road-data-entry.component';
import { MegaCcRoadsComponent } from './mega-cc-roads/mega-cc-roads.component';
import { NonMegaCcRoadsComponent } from './non-mega-cc-roads/non-mega-cc-roads.component';
import { PaymentComponent } from './payment/payment.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CreatelocationComponent,
    LocationlistComponent,
    BtnCellRenderer,
    ModulesInLocationComponent,
    ModuledetailComponent,
    BtnSaveCellRenderer,
    BtnConSaveCellRenderer,
    MasticRoadListComponent,
    MasticRoadDataEntryComponent,
    MegaCcRoadsComponent,
    MegaCCBtnCellRenderer,
    NonMegaCcRoadsComponent,
    NonMegaCCBtnCellRenderer,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    IconModule,
    AccordionModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    DragDropModule,
    CardModule,
    CarouselModule,
    AgGridModule,
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
    LocationmasterRoutingModule,
    HttpClientModule
  ],
})
export class LocationmasterModule {}
