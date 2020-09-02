import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { VisualComponent } from './visual/visual.component';
import { ManagementsComponent } from './managements/managements.component';
import { DiscoverComponent } from './discover/discover.component';
import { AuthGuard } from '../shared/services/auth.guard';
import { UsersComponent } from './users/users.component';
import { Role } from '../shared/modal/role'
import { JupyterComponent } from './jupyter/jupyter.component';

const routes: Routes = [

  {
    path:'',children:[{
      path:'reporting',
      component:ReportsComponent,
      canActivate:[AuthGuard],
    },{
      path:'visualization',
      component:VisualComponent,
      canActivate:[AuthGuard],

    },{
      path:'management',
      component:ManagementsComponent,
      canActivate:[AuthGuard]
    },{
      path:'adhoc',
      component:DiscoverComponent,
      canActivate:[AuthGuard]
    },
    {
      path:'user',
      component:UsersComponent,
      canActivate:[AuthGuard],
      // data:{roles:[Role.Admin]}
    },{
      path:'jupyter',
      component:JupyterComponent,
      canActivate:[AuthGuard],
      // data:{roles:[Role.Admin]}
    }] 
  },
  
  {
    path:'**',
    redirectTo:'error/404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
