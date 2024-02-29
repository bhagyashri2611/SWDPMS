import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { IconModule } from '@coreui/icons-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LocationmasterRoutingModule } from './locationmaster-routing.module';
import { CreatelocationComponent } from './createlocation/createlocation.component';
import { LocationlistComponent } from './locationlist/locationlist.component';
import { BtnCellRenderer } from './locationlist/button-cell-renderer.component';
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
@NgModule({
  declarations: [
    CreatelocationComponent,
    LocationlistComponent,
    BtnCellRenderer,
    ModulesInLocationComponent,
    ModuledetailComponent,
    BtnSaveCellRenderer,
    BtnConSaveCellRenderer,
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
  ],
})
export class LocationmasterModule {}
