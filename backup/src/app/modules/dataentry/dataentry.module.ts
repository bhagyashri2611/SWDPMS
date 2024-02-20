import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataentryRoutingModule } from './dataentry-routing.module';
import { CreatedataentryComponent } from './createdataentry/createdataentry.component';
import { GeneratedataentrypageComponent } from './generatedataentrypage/generatedataentrypage.component';


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
  ModalModule,
} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RepeatTypeComponent} from './generatedataentrypage/repeat-section.type'
import { FormlyModule } from '@ngx-formly/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    CreatedataentryComponent,
    GeneratedataentrypageComponent,
    RepeatTypeComponent
  ],
  imports: [
    ModalModule,
    CommonModule,
    DataentryRoutingModule,
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
    ReactiveFormsModule,
    FormsModule,
    FormModule,
    AgGridModule,
    FormlyModule,
    IconModule,
    BrowserModule,
    DragDropModule,
    FormlyModule.forRoot({
      types: [{ name: 'repeat', component: RepeatTypeComponent }],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    BrowserAnimationsModule,
  ]
})
export class DataentryModule { }
