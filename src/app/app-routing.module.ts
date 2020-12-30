import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CovidComponent } from './covid/covid.component';
import { CovidDataPackageComponent } from './covid-data-package/covid-data-package.component';
import { CovidAnalysisFourComponent } from './covid-analysis-four/covid-analysis-four.component';
import { CovidAnalysisThreeComponent } from './covid-analysis-three/covid-analysis-three.component';
import { CovidAnalysisTwoComponent } from './covid-analysis-two/covid-analysis-two.component';

const routes: Routes = [
	{
		path: 'covid',
		component: CovidComponent
	},
	{
		path: 'covid/analysis/2',
		component: CovidAnalysisTwoComponent
	},
	{
		path: 'covid/analysis/3',
		component: CovidAnalysisThreeComponent
	},
	{
		path: 'covid/analysis/4',
		component: CovidAnalysisFourComponent
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
