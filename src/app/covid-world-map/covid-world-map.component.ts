import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
	selector: 'app-covid-world-map',
	templateUrl: './covid-world-map.component.html',
	styleUrls: ['./covid-world-map.component.css']
})
export class CovidWorldMapComponent implements OnInit {

	private map;

	constructor() { }

	ngOnInit(): void { }

	ngAfterViewInit(): void { }
}
