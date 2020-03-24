import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';

import { WorkhorseService } from '../app/workhorse.service';

import { CovidData } from '../app/model/covidData';
import { Country } from '../app/model/country';
import { Province } from '../app/model/province';
import { Coordinate } from '../app/model/coordinate';
import { Timeseries } from '../app/model/timeseries';

@Injectable({
	providedIn: 'root'
})
export class CoviddataService {

	private http: HttpClient;
	private PAPA: Papa;
	private workhorse: WorkhorseService;

	private COVID_19_TIMESERIES_CONFIRMED_URL: string = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
	private COVID_19_TIMESERIES_DEATH_URL: string = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
	private COVID_19_TIMESERIES_RECOVERY_URL: string = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv';

	private covidTimeseriesConfirmedRawData: string;
	private covidTimeseriesDeathRawData: string;
	private covidTimeseriesRecoveryRawData: string;

	private confirmedCovidData: CovidData = new CovidData();
	private deathCovidData: CovidData = new CovidData();
	private recoveryCovidData: CovidData = new CovidData();

	constructor(http: HttpClient, PAPA: Papa, workhorse: WorkhorseService) {

		this.http = http;
		this.PAPA = PAPA;
		this.workhorse = workhorse;
	}

	public init(callback: any, initCase: number): void {
		
		if(initCase == 1) this.setupCovidTimeseriesData(this.COVID_19_TIMESERIES_CONFIRMED_URL, initCase, callback);
		else if(initCase == 2) this.setupCovidTimeseriesData(this.COVID_19_TIMESERIES_DEATH_URL, initCase, callback);
		else if(initCase == 3) this.setupCovidTimeseriesData(this.COVID_19_TIMESERIES_RECOVERY_URL, initCase, callback);
	}

	public getConfirmedCovidData(): CovidData {
		return this.confirmedCovidData;
	}

	public getDeathCovidData(): CovidData {
		return this.deathCovidData;
	}

	public getRecoveryCovidData(): CovidData {
		return this.recoveryCovidData;
	}

	private prepareCovidConfirmedDataObject(data: any, covidTimeseriesConfirmedCallback: any): void {

		this.covidTimeseriesConfirmedRawData = data;
		let headers: string[];

		this.PAPA.parse(this.covidTimeseriesConfirmedRawData, {

			complete: (result) => {

				var rows = result.data;
				headers = rows[0];
				let rowLength: number = headers.length;

				for(let i: number = 0; i < rows.length; i++)
					if(rows[i].length != rowLength)
						rows.splice(i, 1);

				this.confirmedCovidData.setHeaders(headers);

				for(let i: number = 1; i < rows.length; i++) {

					let countryName: string = rows[i][1];
					let provinceName: string = rows[i][0];
					let latitude: string = rows[i][2];
					let longitude: string = rows[i][3];
					let timeseries: Timeseries[] = this.workhorse.prepareTimeseries(rows[i], headers, 4);

					if(provinceName.length == 0) provinceName = "n/a";

					let coordinates: Coordinate = new Coordinate(latitude, longitude);
					let country: Country = new Country(countryName);
					let province: Province = new Province(provinceName, coordinates, timeseries);

					if(!this.workhorse.doesCountryExist(this.confirmedCovidData.getCountries(), countryName)) this.confirmedCovidData.addCountry(country);
					else country = this.confirmedCovidData.getCountryByName(countryName);
					
					if(!this.workhorse.doesProvinceExist(country, provinceName)) country.addProvince(province);
				}

				covidTimeseriesConfirmedCallback();
			}
		});
	}

	private prepareCovidDeathDataObject(data: any, covidTimeseriesDeathCallback: any): void {

		this.covidTimeseriesDeathRawData = data;
		let headers: string[];

		this.PAPA.parse(this.covidTimeseriesDeathRawData, {

			complete: (result) => {

				var rows = result.data;
				headers = rows[0];
				let rowLength: number = headers.length;

				for(let i: number = 0; i < rows.length; i++)
					if(rows[i].length != rowLength)
						rows.splice(i, 1);

				this.deathCovidData.setHeaders(headers);

				for(let i: number = 1; i < rows.length; i++) {

					let countryName: string = rows[i][1];
					let provinceName: string = rows[i][0];
					let latitude: string = rows[i][2];
					let longitude: string = rows[i][3];
					let timeseries: Timeseries[] = this.workhorse.prepareTimeseries(rows[i], headers, 4);

					if(provinceName.length == 0) provinceName = "n/a";

					let coordinates: Coordinate = new Coordinate(latitude, longitude);
					let country: Country = new Country(countryName);
					let province: Province = new Province(provinceName, coordinates, timeseries);

					if(!this.workhorse.doesCountryExist(this.deathCovidData.getCountries(), countryName)) this.deathCovidData.addCountry(country);
					else country = this.deathCovidData.getCountryByName(countryName);
					
					if(!this.workhorse.doesProvinceExist(country, provinceName)) country.addProvince(province);
				}

				covidTimeseriesDeathCallback();
			}
		});
	}

	private prepareCovidRecoveryDataObject(data: any, covidTimeseriesRecoveryCallback: any): void {

		this.covidTimeseriesRecoveryRawData = data;
		let headers: string[];

		this.PAPA.parse(this.covidTimeseriesRecoveryRawData, {

			complete: (result) => {

				var rows = result.data;
				headers = rows[0];
				let rowLength: number = headers.length;

				for(let i: number = 0; i < rows.length; i++)
					if(rows[i].length != rowLength)
						rows.splice(i, 1);

				this.recoveryCovidData.setHeaders(headers);

				for(let i: number = 1; i < rows.length; i++) {

					let countryName: string = rows[i][1];
					let provinceName: string = rows[i][0];
					let latitude: string = rows[i][2];
					let longitude: string = rows[i][3];
					let timeseries: Timeseries[] = this.workhorse.prepareTimeseries(rows[i], headers, 4);

					if(provinceName.length == 0) provinceName = "n/a";

					let coordinates: Coordinate = new Coordinate(latitude, longitude);
					let country: Country = new Country(countryName);
					let province: Province = new Province(provinceName, coordinates, timeseries);

					if(!this.workhorse.doesCountryExist(this.recoveryCovidData.getCountries(), countryName)) this.recoveryCovidData.addCountry(country);
					else country = this.recoveryCovidData.getCountryByName(countryName);
					
					if(!this.workhorse.doesProvinceExist(country, provinceName)) country.addProvince(province);
				}

				covidTimeseriesRecoveryCallback();
			}
		});
	}

	private setupCovidTimeseriesData(url, initCase, callback: any): void {
		this.loadCovidTimeseriesData(url).subscribe((data: any) => {

			if(initCase == 1) this.prepareCovidConfirmedDataObject(data, callback);
			else if(initCase == 2) this.prepareCovidDeathDataObject(data, callback);
			else if(initCase == 3) this.prepareCovidRecoveryDataObject(data, callback);
		});
	}

	private loadCovidTimeseriesData(url) {
		return this.http.get(url, { responseType: 'text' });
	}
}
