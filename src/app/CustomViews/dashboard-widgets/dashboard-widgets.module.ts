import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardWidgetsRoutingModule } from './dashboard-widgets-routing.module';
import { NumberWidgetComponent } from './number-widget/number-widget.component';
import { FilterComponent } from './filter/filter.component';

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
import { FilterButtonComponent } from './filter-button/filter-button.component';
import { InfoWidgetComponent } from './info-widget/info-widget.component';

import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { BarChartWidgetComponent } from './bar-chart-widget/bar-chart-widget.component';

@NgModule({
  declarations: [
    ProgressBarComponent,
    BarChartWidgetComponent,
    NumberWidgetComponent,
    FilterComponent,
    FilterButtonComponent,
    InfoWidgetComponent,
  ],
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
    ReactiveFormsModule,
  ],
  exports: [NumberWidgetComponent, FilterButtonComponent,InfoWidgetComponent,ProgressBarComponent,BarChartWidgetComponent],
})
export class DashboardWidgetsModule {}
