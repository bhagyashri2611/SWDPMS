import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardWidgetsRoutingModule } from './dashboard-widgets-routing.module';
import { NumberWidgetComponent } from './number-widget/number-widget.component';

import { ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule,
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

@NgModule({
  declarations: [NumberWidgetComponent],
  imports: [
    CommonModule,
    DashboardWidgetsRoutingModule,
    AvatarModule,
    ButtonGroupModule,
    ButtonModule,
    CardModule,
    FormModule,
    GridModule,
    NavModule,
    ProgressModule,
    TableModule,
    TabsModule,
    IconModule,
    ChartjsModule,
  ],
  exports: [NumberWidgetComponent],
})
export class DashboardWidgetsModule {}
