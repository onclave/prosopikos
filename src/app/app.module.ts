import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CovidComponent } from './covid/covid.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CovidComponent
	],
	imports: [
		BrowserModule,
		FlexLayoutModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatSidenavModule,
		MatIconModule,
		MatButtonModule,
		MatCardModule,
		MatGridListModule,
		MatChipsModule,
		MatTabsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
