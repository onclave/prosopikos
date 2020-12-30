import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [HomeComponent],
	imports: [
		CommonModule,
		HomeRoutingModule,
		FlexLayoutModule,
		MatCardModule,
		MatChipsModule
	]
})
export class HomeModule { }
