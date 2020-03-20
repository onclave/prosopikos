import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CovidComponent } from './covid/covid.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'covid',
    component: CovidComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
