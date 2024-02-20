import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { IconModule } from '@coreui/icons-angular';

import { CommonModule } from '@angular/common';
import { UnitMasterRoutingModule } from './unit-master-routing.module';
import { UnitListComponent } from './unit-list/unit-list.component';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { BtnCellRenderer } from './unit-list/button-cell-renderer.component';

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

@NgModule({
  declarations: [UnitListComponent, CreateUnitComponent, BtnCellRenderer],
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    AgGridModule,
    ReactiveFormsModule,
    UnitMasterRoutingModule,
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
  ],
})
export class UnitMasterModule {}
