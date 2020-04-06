import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { CovidData } from '../model/covidData';
import { CoviddataService } from '../coviddata.service';
import { CovidMapService } from '../covid-map.service';
import { MatRadioChange } from '@angular/material/radio';

@Component({
	selector: 'app-covid-map',
	templateUrl: './covid-map.component.html',
	styleUrls: ['./covid-map.component.css']
})
export class CovidMapComponent implements OnInit {

	private coviddataService: CoviddataService;
	private covidMapService: CovidMapService;
	private map;

	public selectedMapType: string = '1';
	
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
		this.prepareIndianMap();
	}

	public onChangeSelectMapToShow(event: MatRadioChange): void {

		switch(event.value) {
			case '1': this.prepareIndianMap(); break;
			case '2': this.prepareWorldMap(); break;
		}
	}

	public prepareIndianMap(): void {

		if(!this.map) {

			this.map = L.map('map', {
				worldCopyJump: true
			});

			const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 6,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			});

			tiles.addTo(this.map);
		}

		this.map.setZoom(5);
		this.map.setMinZoom(4);
		this.map.setMaxZoom(6);
		this.map.setView([20.5937, 78.9629], 5);

		this.covidMapService.initIndiaMapMarker(this.map, this.coviddataService, true);
	}

	public prepareWorldMap(): void {

		this.map.setMinZoom(1);
		this.map.setMaxZoom(10);
		this.map.setView([20.5937, 78.9629], 2);

		this.covidMapService.setIsWorldMapSelected(true);
		this.covidMapService.initWorldMapMarker(this.map, this.coviddataService, true);
	}
}
