import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { IconModule } from '@coreui/icons-angular';
import { ModulemasterRoutingModule } from './modulemaster-routing.module';
import { ModulelistComponent } from './modulelist/modulelist.component';
import { CreatemoduleComponent } from './createmodule/createmodule.component';
import { BtnCellRenderer } from './modulelist/button-cell-renderer.component';
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
  declarations: [ModulelistComponent, CreatemoduleComponent, BtnCellRenderer],
  imports: [
    CommonModule,
    ModulemasterRoutingModule,
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
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    AgGridModule,
  ],
})
export class ModulemasterModule {}
