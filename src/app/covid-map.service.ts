import { Injectable } from '@angular/core';

import * as L from 'leaflet';
import { CovidData } from '../app/model/covidData';
import { Coordinate } from './model/coordinate';
import { Country } from './model/country';
import { Province } from './model/province';

@Injectable({
  providedIn: 'root'
})
export class CovidMapService {

  private mapObject: any;

  constructor() { }

  public getMapObject(): any {
    return this.mapObject;
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
					var html = this.buildPopupHTML(name, latitude, longitude, infected, deaths);

					marker.bindPopup(html).openPopup();
					marker.addTo(this.mapObject);
				}
			}
		}
	}

	private buildPopupHTML(titleName: string, latitude: string, longitude: string, infected: number, deaths: number): string {

		let html: string = '<div fxLayout="column" class="pr-map-popup-container">'
						+ '<div><span class="pr-map-popup-title pr-font-nang">' + titleName + '</span></div>'
						// + '<div><span class="pr-map-popup-coordinates pr-font-chn">(' + latitude + ', ' + longitude + ')</span></div>'
						+ '<div fxLayout="row" class="pr-map-popup-info-container">'
						+ '<span class="pr-map-popup-info-header pr-font-nang">Infected: </span><span class="pr-map-popup-info-value pr-font-chn">' + infected + '</span>'
						+ '</div>'
						+ '<div fxLayout="row" class="pr-map-popup-info-container">'
						+ '<span class="pr-map-popup-info-header pr-font-nang">Deaths: </span><span class="pr-map-popup-info-value pr-font-chn">' + deaths + '</span>'
						+ '</div>'
						+ '</div>';

		return html;
	}
}
