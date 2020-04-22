import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CovidComponent } from './covid/covid.component';
import { CovidDataPackageComponent } from './covid-data-package/covid-data-package.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'covid',
    component: CovidComponent
  },
  {
    path: 'covid/covdata',
    component: CovidDataPackageComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
