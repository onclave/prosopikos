import { Injectable } from '@angular/core';

import * as L from 'leaflet';
import { CovidData } from '../app/model/covidData';
import { Coordinate } from './model/coordinate';
import { Country } from './model/country';
import { Province } from './model/province';
import { CoviddataService } from './coviddata.service';

@Injectable({
	providedIn: 'root'
})
export class CovidMapService {

	private mapObject: any;
	private markerObjects: L.Marker[] = null;
	private isWorldMapSelected: boolean = false;

	private indiaMapObject: any;
	private worldMapObject: any;

	constructor() {
		this.markerObjects = new Array();
	}

	public getMapObject(): any {
		return this.mapObject;
	}

	public getIndiaMapObject(): any {
		return this.indiaMapObject;
	}

	public getWorldMapObject(): any {
		return this.worldMapObject;
	}

	public setIsWorldMapSelected(value: boolean): void {
		this.isWorldMapSelected = value;
	}

	public initIndiaMapMarker(map: any, coviddataService: CoviddataService, saveReference: boolean): void {

		let covidConfirmedData: CovidData = coviddataService.getIndiaConfirmedCovidData();
		let covidRecoveryData: CovidData = coviddataService.getIndiaRecoveryCovidData();
		let covidDeathData: CovidData = coviddataService.getIndiaDeathCovidData();

		if(saveReference) this.mapObject = map;

		if(this.areDatasetsReady([covidConfirmedData, covidRecoveryData, covidDeathData])) {
			
			let cIndia: Country = covidConfirmedData.getCountries()[0];
			let rIndia: Country = covidRecoveryData.getCountries()[0];
			let dIndia: Country = covidDeathData.getCountries()[0];

			if(this.markerObjects != null && this.markerObjects.length > 0)
				for(let marker of this.markerObjects) marker.removeFrom(map);

			this.markerObjects = new Array();

			for(let cProvince of cIndia.getProvinces()) {

				let rProvince: Province = rIndia.getProvinceByName(cProvince.getName());
				let dProvince: Province = dIndia.getProvinceByName(cProvince.getName());

				if(rProvince && dProvince) {

					let name: string = cProvince.getName();
					let coordinates: Coordinate = cProvince.getCoordinates();
					let latitude: string = coordinates.getLatitude();
					let longitude: string = coordinates.getLongitude();

					let infected: number = cProvince.getLastTimeseries().getValue();
					let recovery: number = rProvince.getLastTimeseries().getValue();
					let death: number = dProvince.getLastTimeseries().getValue();

					var marker = new L.Marker([ latitude, longitude ], { raiseOnHover: true });
					var html = this.buildPopupHTML(name, infected, recovery, death);

					marker.bindPopup(html).openPopup();
					marker.addTo(map);

					this.markerObjects.push(marker);
				}
			}
		}
	}

	public initWorldMapMarker(map: any, coviddataService: CoviddataService, saveReference: boolean): void {

		let covidConfirmedData: CovidData = coviddataService.getWorldConfirmedCovidData();
		let covidRecoveryData: CovidData = coviddataService.getWorldRecoveryCovidData();
		let covidDeathData: CovidData = coviddataService.getWorldDeathCovidData();

		if(saveReference) this.mapObject = map;

		if(this.isWorldMapSelected && this.areDatasetsReady([covidConfirmedData, covidRecoveryData, covidDeathData])) {

			if(this.markerObjects != null && this.markerObjects.length > 0)
				for(let marker of this.markerObjects) marker.removeFrom(map);

			this.markerObjects = new Array();

			for(let cCountry of covidConfirmedData.getCountries()) {

				let rCountry: Country = covidRecoveryData.getCountryByName(cCountry.getName());
				let dCountry: Country = covidDeathData.getCountryByName(cCountry.getName());

				if(rCountry && dCountry) {

					for(let cProvince of cCountry.getProvinces()) {
						
						let rProvince: Province = rCountry.getProvinceByName(cProvince.getName());
						let dProvince: Province = dCountry.getProvinceByName(cProvince.getName());

						if(rProvince && dProvince) {

							let name: string = cProvince.getNameLabel();
							let coordinates: Coordinate = cProvince.getCoordinates();
							let latitude: string = coordinates.getLatitude();
							let longitude: string = coordinates.getLongitude();

							let infected: number = cProvince.getLastTimeseries().getValue();
							let recovery: number = rProvince.getLastTimeseries().getValue();
							let death: number = dProvince.getLastTimeseries().getValue();

							var marker = new L.Marker([ latitude, longitude ], { raiseOnHover: true });
							var html = this.buildPopupHTML(name, infected, recovery, death);

							marker.bindPopup(html).openPopup();
							marker.addTo(map);

							this.markerObjects.push(marker);
						}
					}
				}
			}
		}
	}









	public initIndiaMap(map: any, coviddataService: CoviddataService, saveReference: boolean): void {

		let covidConfirmedData: CovidData = coviddataService.getIndiaConfirmedCovidData();

		if(saveReference) this.indiaMapObject = map;

		if(this.indiaMapObject && covidConfirmedData && covidConfirmedData.getCountries() && (covidConfirmedData.getCountries().length == 1)) {

			let india: Country = covidConfirmedData.getCountries()[0];

			for(let province of india.getProvinces()) {

				let name: string = province.getName();
				let coordinates: Coordinate = province.getCoordinates();
				let latitude: string = coordinates.getLatitude();
				let longitude: string = coordinates.getLongitude();

				let infected: number = province.getLastTimeseries().getValue();

				var marker = new L.Marker([ latitude, longitude ]);
				var html = this.buildPopupHTML(name, infected, -1, 0);

				marker.bindPopup(html).openPopup();
				marker.addTo(this.indiaMapObject);
			}
		}
	}

	public initWorldMap(): void {

		// this.worldMapObject = L.map('map', {
		// 	zoom: 5,
		// 	minZoom: 4,
		// 	maxZoom: 6,
		// 	worldCopyJump: true
		// });

		// this.worldMapObject.setView([20.5937, 78.9629], 5);

		// const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		// 	maxZoom: 6,
		// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		// });

		// tiles.addTo(this.worldMapObject);

		// this.covidMapService.initIndiaMap(this.map, this.coviddataService, true);
	}

	public initMap(map: any, covidConfirmedData: CovidData, covidDeathData: CovidData, saveReference: boolean): void {

		if(saveReference) this.mapObject = map;

		if((covidConfirmedData.getCountries().length > 0) && (covidDeathData.getCountries().length > 0)) {

			let countries: Country[] = covidConfirmedData.getCountries();

			for(let i: number = 0; i < countries.length; i++) {

				let provinces: Province[] = countries[i].getProvinces();

				for(let j: number = 0; j < provinces.length; j++) {

					let province: Province = provinces[j];
					let name: string = province.getName();
					let coordinates: Coordinate = province.getCoordinates();
					let latitude: string = coordinates.getLatitude();
					let longitude: string = coordinates.getLongitude();

					let infected: number = province.getLastTimeseries().getValue();
					let deaths: number = covidDeathData.getCountries()[i].getProvinces()[j].getLastTimeseries().getValue();

					if(name == 'n/a') name = countries[i].getName();

					var marker = new L.Marker([ latitude, longitude ]);
					var html = this.buildPopupHTML(name, infected, deaths, 0);

					marker.bindPopup(html).openPopup();
					marker.addTo(this.mapObject);
				}
			}
		}
	}

	private buildPopupHTML(titleName: string, infected: number, recovery: number, deaths: number): string {

		let html: string = '<div fxLayout="column" class="pr-map-popup-container">'
						+ '<div><span class="pr-map-popup-title pr-font-nang">' + titleName + '</span></div>'
						+ '<div fxLayout="row" class="pr-map-popup-info-container">'
						+ '<span class="pr-map-popup-info-header pr-font-nang">Infected: </span><span class="pr-map-popup-info-value pr-font-chn">' + infected + '</span>'
						+ '</div>'
						+ '<div fxLayout="row" class="pr-map-popup-info-container">'
						+ '<span class="pr-map-popup-info-header pr-font-nang">Recovery: </span><span class="pr-map-popup-info-value pr-font-chn">' + recovery + '</span>'
						+ '</div>'
						+ '<div fxLayout="row" class="pr-map-popup-info-container">'
						+ '<span class="pr-map-popup-info-header pr-font-nang">Deaths: </span><span class="pr-map-popup-info-value pr-font-chn">' + deaths + '</span>'
						+ '</div>'
						+ '</div>';

		return html;
	}

	private areDatasetsReady(covidDatas: CovidData[]): boolean {
		for(let covidData of covidDatas) if(!this.isDatasetReady(covidData)) return false; return true;
	}

	private isDatasetReady(covidData: CovidData): boolean {
		return covidData && covidData.getCountries() && (covidData.getCountries().length > 0);
	}
}
