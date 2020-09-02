import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ManagementsComponent } from './managements/managements.component';
import { VisualComponent } from './visual/visual.component';
import { ReportsComponent } from './reports/reports.component';
import { DiscoverComponent } from './discover/discover.component';
import { UsersComponent } from './users/users.component';
import { SwitchComponent } from './switch/switch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ErrorModule } from '../error/error.module';
import { JupyterComponent } from './jupyter/jupyter.component';

@NgModule({
  declarations: [ManagementsComponent, VisualComponent, ReportsComponent, DiscoverComponent, UsersComponent, SwitchComponent, JupyterComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ErrorModule,
   
  ]
})
export class DashboardModule { }
