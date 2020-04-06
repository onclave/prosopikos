import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { CovidMapService } from '../covid-map.service';
import { CoviddataService } from '../coviddata.service';

@Component({
	selector: 'app-covid-india-map',
	templateUrl: './covid-india-map.component.html',
	styleUrls: ['./covid-india-map.component.css']
})
export class CovidIndiaMapComponent implements OnInit {

	private coviddataService: CoviddataService;
	private covidMapService: CovidMapService;

	private map;

	constructor(coviddataService: CoviddataService, covidMapService: CovidMapService) {

		this.coviddataService = coviddataService;
		this.covidMapService = covidMapService;
	}

	ngOnInit(): void { }

	ngAfterViewInit(): void {

		this.map = L.map('map', {
			zoom: 5,
			minZoom: 4,
			maxZoom: 6,
			worldCopyJump: true
		});

		this.map.setView([20.5937, 78.9629], 5);

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 6,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

		tiles.addTo(this.map);
		
		this.covidMapService.initIndiaMap(this.map, this.coviddataService, true);
	}
}
