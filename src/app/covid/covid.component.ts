import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CovidMapService } from '../covid-map.service';
import { CoviddataService } from '../coviddata.service';

import * as L from 'leaflet';

@Component({
	selector: 'app-covid',
	templateUrl: './covid.component.html',
	styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {

	constructor() {}

	ngOnInit(): void {}

	public tabChanged(event: MatTabChangeEvent) {
		// console.log(event.index);
	}
}