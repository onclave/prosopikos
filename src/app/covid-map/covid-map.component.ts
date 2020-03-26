import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { CovidData } from '../model/covidData';
import { CoviddataService } from '../coviddata.service';
import { CovidMapService } from '../covid-map.service';

@Component({
	selector: 'app-covid-map',
	templateUrl: './covid-map.component.html',
	styleUrls: ['./covid-map.component.css']
})
export class CovidMapComponent implements OnInit {

	private coviddataService: CoviddataService;
	private covidMapService: CovidMapService;
	private map;
	
	public covidConfirmedData: CovidData;
	public covidDeathData: CovidData;

	constructor(coviddataService: CoviddataService, covidMapService: CovidMapService) {

		this.coviddataService = coviddataService;
		this.covidMapService = covidMapService;
	}

	ngOnInit(): void {

		this.covidConfirmedData = this.coviddataService.getConfirmedCovidData();
		this.covidDeathData = this.coviddataService.getDeathCovidData();
	}

	ngAfterViewInit(): void {

		this.map = L.map('map', {
			zoom: 5,
			minZoom: 1,
			maxZoom: 10,
			worldCopyJump: true
		});

		this.map.setView([20.5937, 78.9629], 3);

		const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		});

		tiles.addTo(this.map);

		this.covidMapService.initMap(this.map, this.covidConfirmedData, this.covidDeathData, true);
	}

	
}
