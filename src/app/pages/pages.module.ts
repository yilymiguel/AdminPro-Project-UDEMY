import { NgModule } from '@angular/core';

//Routes
import { PAGES_ROUTES } from './pages.route';

//Module Shared
import { SharedModule } from '../shared/shared.module';


import { PagesComponent } from './pages.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({

  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ],

  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES
  ]

})

export class PagesModule { }
