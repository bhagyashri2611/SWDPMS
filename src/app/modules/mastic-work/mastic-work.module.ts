import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasticWorkRoutingModule } from './mastic-work-routing.module';
import { MasticWorkDataEntryComponent } from './mastic-work-data-entry/mastic-work-data-entry.component';

import { AgGridModule } from 'ag-grid-angular';
import { IconModule } from '@coreui/icons-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
import { MasticWorkListComponent } from './mastic-work-list/mastic-work-list.component';
import {BtnCellRenderer} from './mastic-work-list/button-cell-renderer.component'
@NgModule({
  declarations: [MasticWorkDataEntryComponent, MasticWorkListComponent,BtnCellRenderer],
  imports: [
    CommonModule,
    DragDropModule,
    IconModule,
    AgGridModule,
    MasticWorkRoutingModule,
    FormsModule,
    ReactiveFormsModule,
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
export class MasticWorkModule {}
