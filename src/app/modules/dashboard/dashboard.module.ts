import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { WidgetsModule } from '../../views/widgets/widgets.module';
import { BaseModule } from '../../views/base/base.module';
import { NgChartsModule } from 'ng2-charts';
import {DashboardWidgetsModule} from '../../CustomViews/dashboard-widgets/dashboard-widgets.module'
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NgChartsModule,
    NavModule,
    TabsModule,
    DashboardRoutingModule,
    FormsModule,
    WidgetsModule,
    BaseModule,
    ButtonModule,
    DashboardWidgetsModule,
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
export class DashboardModule {}
