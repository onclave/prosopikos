import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CovidComponent } from './covid/covid.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CovidHelpComponent } from './covid-help/covid-help.component';
import { CovidAboutComponent } from './covid-about/covid-about.component';
import { CovidMapComponent } from './covid-map/covid-map.component';
import { CovidNewsComponent } from './covid-news/covid-news.component';
import { CovidAnalysisComponent } from './covid-analysis/covid-analysis.component';
import { CovidIndiaComponent } from './covid-india/covid-india.component';
import { CovidWorldComponent } from './covid-world/covid-world.component';
import { CovidContributionComponent } from './covid-contribution/covid-contribution.component';
import { CovidDatasetsComponent } from './covid-datasets/covid-datasets.component';
import { CovidDataPackageComponent } from './covid-data-package/covid-data-package.component';
import { CovidAnalysisTwoComponent } from './covid-analysis-two/covid-analysis-two.component';
import { CovidAnalysisThreeComponent } from './covid-analysis-three/covid-analysis-three.component';
import { CovidAnalysisFourComponent } from './covid-analysis-four/covid-analysis-four.component';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CovidComponent,
		CovidHelpComponent,
		CovidAboutComponent,
		CovidMapComponent,
		CovidNewsComponent,
		CovidAnalysisComponent,
		CovidIndiaComponent,
		CovidWorldComponent,
		CovidContributionComponent,
		CovidDatasetsComponent,
		CovidDataPackageComponent,
		CovidAnalysisTwoComponent,
		CovidAnalysisThreeComponent,
		CovidAnalysisFourComponent
	],
	imports: [
		BrowserModule,
		FlexLayoutModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		YouTubePlayerModule,
		MatSidenavModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatGridListModule,
		MatChipsModule,
		MatTabsModule,
		MatTableModule,
		MatFormFieldModule,
		MatExpansionModule,
		NgxChartsModule,
		MatSliderModule,
		MatProgressBarModule,
		MatSelectModule,
		MatSnackBarModule,
		MatPaginatorModule,
		MatButtonToggleModule,
		MatSlideToggleModule,
		MatRadioModule,
		MatCheckboxModule,
		HttpClientModule,
		FormsModule,
		LayoutModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
