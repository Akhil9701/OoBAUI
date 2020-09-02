import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './dashboard/reports/reports.component';
import { AuthGuard } from './shared/services/auth.guard';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppComponent } from './app.component';
import { ErrorModule } from './error/error.module';


const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'datavis', component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        // path: '', loadChildren:'./dashboard/dashboard.module#DashboardModule'
        path: '', loadChildren: () => DashboardModule,
        // path: '', loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule)
      },
      {
        path: 'datavis/reporting', component: ReportsComponent
      }
    ]
  },

  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'error', loadChildren: () => ErrorModule
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
