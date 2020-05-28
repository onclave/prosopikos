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

	private COVID_19_TIMESERIES_INDIA_CONFIRMED_URL: string = 'https://raw.githubusercontent.com/kalyaniuniversity/COVID-19-Datasets/master/India%20Statewise%20Confirmed%20Cases/COVID19_INDIA_STATEWISE_TIME_SERIES_CONFIRMED.csv';
	private COVID_19_TIMESERIES_INDIA_RECOVERY_URL: string = 'https://raw.githubusercontent.com/kalyaniuniversity/COVID-19-Datasets/master/India%20Statewise%20Recovery%20Cases/COVID19_INDIA_STATEWISE_TIME_SERIES_RECOVERY.csv';
	private COVID_19_TIMESERIES_INDIA_DEATH_URL: string = 'https://raw.githubusercontent.com/kalyaniuniversity/COVID-19-Datasets/master/India%20Statewise%20Death%20Cases/COVID19_INDIA_STATEWISE_TIME_SERIES_DEATH.csv';
	private COVID_19_TIMESERIES_WORLD_CONFIRMED_URL: string = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
	private COVID_19_TIMESERIES_WORLD_DEATH_URL: string = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
	private COVID_19_TIMESERIES_WORLD_RECOVERY_URL: string = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv';

	private covidTimeseriesIndiaConfirmedRawData: string;
	private covidTimeseriesIndiaRecoveryRawData: string;
	private covidTimeseriesIndiaDeathRawData: string;
	private covidTimeseriesWorldConfirmedRawData: string;
	private covidTimeseriesWorldRecoveryRawData: string;
	private covidTimeseriesWorldDataRawData: string;

	private covidTimeseriesConfirmedRawData: string;
	private covidTimeseriesDeathRawData: string;
	private covidTimeseriesRecoveryRawData: string;

	private indiaConfirmedCovidData: CovidData = new CovidData();
	private indiaRecoveryCovidData: CovidData = new CovidData();
	private indiaDeathCovidData: CovidData = new CovidData();
	private worldConfirmedCovidData: CovidData = new CovidData();
	private worldDeathCovidData: CovidData = new CovidData();
	private worldRecoveryCovidData: CovidData = new CovidData();

	private confirmedCovidData: CovidData = new CovidData();
	private deathCovidData: CovidData = new CovidData();
	private recoveryCovidData: CovidData = new CovidData();

	constructor(http: HttpClient, PAPA: Papa, workhorse: WorkhorseService) {

		this.http = http;
		this.PAPA = PAPA;
		this.workhorse = workhorse;
	}

	public init(callback: any, initCase: number): void {
		if(initCase == 1) this.setupCovidTimeseriesData(this.COVID_19_TIMESERIES_INDIA_CONFIRMED_URL, initCase, callback);
		else if(initCase == 2) this.setupCovidTimeseriesData(this.COVID_19_TIMESERIES_INDIA_RECOVERY_URL, initCase, callback);
		else if(initCase == 3) this.setupCovidTimeseriesData(this.COVID_19_TIMESERIES_INDIA_DEATH_URL, initCase, callback);
		else if(initCase == 4) this.setupCovidTimeseriesData(this.COVID_19_TIMESERIES_WORLD_CONFIRMED_URL, initCase, callback);
		else if(initCase == 5) this.setupCovidTimeseriesData(this.COVID_19_TIMESERIES_WORLD_RECOVERY_URL, initCase, callback);
		else if(initCase == 6) this.setupCovidTimeseriesData(this.COVID_19_TIMESERIES_WORLD_DEATH_URL, initCase, callback);
	}

	public getIndiaConfirmedCovidData(): CovidData {
		return this.indiaConfirmedCovidData;
	}

	public getIndiaRecoveryCovidData(): CovidData {
		return this.indiaRecoveryCovidData;
	}

	public getIndiaDeathCovidData(): CovidData {
		return this.indiaDeathCovidData;
	}

	public getWorldConfirmedCovidData(): CovidData {
		return this.worldConfirmedCovidData;
	}

	public getWorldDeathCovidData(): CovidData {
		return this.worldDeathCovidData;
	}

	public getWorldRecoveryCovidData(): CovidData {
		return this.worldRecoveryCovidData;
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

	private prepareCovidIndiaConfirmedDataObject(data: any, covidTimeseriesIndiaConfirmedCallback: any): void {

		this.covidTimeseriesIndiaConfirmedRawData = data;
		let headers: string[];

		this.PAPA.parse(this.covidTimeseriesIndiaConfirmedRawData, {

			complete: (result) => {

				var rows = result.data;
				headers = rows[0];
				let rowLength: number = headers.length;
				let india: Country = new Country("India");

				for(let i: number = 1; i < rows.length; i++)
					if(rows[i].length != rowLength)
						rows.splice(i, 1);

				this.indiaConfirmedCovidData.setHeaders(headers);

				for(let i: number = 1; i < (rows.length - 1); i++) {

					let provinceName: string = rows[i][0];
					let provinceCode: string = rows[i][1];
					let latitude: string = rows[i][2];
					let longitude: string = rows[i][3];
					let perCapitaIncome: number = this.workhorse.getNumberFromCommaSeparatedString(rows[i][4]);
					let population: number = this.workhorse.getNumberFromCommaSeparatedString(rows[i][5]);
					let avgTemperature: number = +rows[i][6];
					let timeseries: Timeseries[] = this.workhorse.prepareTimeseries(rows[i], headers, 7);
					let coordinates: Coordinate = new Coordinate(latitude, longitude);
					let province: Province = new Province(provinceName, "India", coordinates, timeseries);

					province.setPerCapitaIncome(perCapitaIncome);
					province.setPopulation(population);
					province.setAvgTemperature(avgTemperature);
					province.setProvinceCode(provinceCode);

					india.addProvince(province);
				}

				this.indiaConfirmedCovidData.addCountry(india);
				covidTimeseriesIndiaConfirmedCallback();
			}
		});
	}

	private prepareCovidIndiaRecoveryDataObject(data: any, covidTimeseriesIndiaConfirmedCallback: any): void {

		this.covidTimeseriesIndiaRecoveryRawData = data;
		let headers: string[];

		this.PAPA.parse(this.covidTimeseriesIndiaRecoveryRawData, {

			complete: (result) => {

				var rows = result.data;
				headers = rows[0];
				let rowLength: number = headers.length;
				let india: Country = new Country("India");

				for(let i: number = 1; i < rows.length; i++)
					if(rows[i].length != rowLength)
						rows.splice(i, 1);

				this.indiaRecoveryCovidData.setHeaders(headers);

				for(let i: number = 1; i < (rows.length - 1); i++) {

					let provinceName: string = rows[i][0];
					let provinceCode: string = rows[i][1];
					let latitude: string = rows[i][2];
					let longitude: string = rows[i][3];
					let perCapitaIncome: number = this.workhorse.getNumberFromCommaSeparatedString(rows[i][4]);
					let population: number = this.workhorse.getNumberFromCommaSeparatedString(rows[i][5]);
					let avgTemperature: number = +rows[i][6];
					let timeseries: Timeseries[] = this.workhorse.prepareTimeseries(rows[i], headers, 7);
					let coordinates: Coordinate = new Coordinate(latitude, longitude);
					let province: Province = new Province(provinceName, "India", coordinates, timeseries);

					province.setPerCapitaIncome(perCapitaIncome);
					province.setPopulation(population);
					province.setAvgTemperature(avgTemperature);
					province.setProvinceCode(provinceCode);

					india.addProvince(province);
				}

				this.indiaRecoveryCovidData.addCountry(india);
				covidTimeseriesIndiaConfirmedCallback();
			}
		});
	}

	private prepareCovidIndiaDeathDataObject(data: any, covidTimeseriesIndiaConfirmedCallback: any): void {

		this.covidTimeseriesIndiaDeathRawData = data;
		let headers: string[];

		this.PAPA.parse(this.covidTimeseriesIndiaDeathRawData, {

			complete: (result) => {

				var rows = result.data;
				headers = rows[0];
				let rowLength: number = headers.length;
				let india: Country = new Country("India");

				for(let i: number = 1; i < rows.length; i++)
					if(rows[i].length != rowLength)
						rows.splice(i, 1);

				this.indiaDeathCovidData.setHeaders(headers);

				for(let i: number = 1; i < (rows.length - 1); i++) {

					let provinceName: string = rows[i][0];
					let provinceCode: string = rows[i][1];
					let latitude: string = rows[i][2];
					let longitude: string = rows[i][3];
					let perCapitaIncome: number = this.workhorse.getNumberFromCommaSeparatedString(rows[i][4]);
					let population: number = this.workhorse.getNumberFromCommaSeparatedString(rows[i][5]);
					let avgTemperature: number = +rows[i][6];
					let timeseries: Timeseries[] = this.workhorse.prepareTimeseries(rows[i], headers, 7);
					let coordinates: Coordinate = new Coordinate(latitude, longitude);
					let province: Province = new Province(provinceName, "India", coordinates, timeseries);

					province.setPerCapitaIncome(perCapitaIncome);
					province.setPopulation(population);
					province.setAvgTemperature(avgTemperature);
					province.setProvinceCode(provinceCode);

					india.addProvince(province);
				}

				this.indiaDeathCovidData.addCountry(india);
				covidTimeseriesIndiaConfirmedCallback();
			}
		});
	}

	// make this shit DRY
	private prepareCovidWorldConfirmedDataObject(data: any, covidTimeseriesConfirmedCallback: any): void {

		this.covidTimeseriesWorldConfirmedRawData = data;
		let headers: string[];

		this.PAPA.parse(this.covidTimeseriesWorldConfirmedRawData, {

			complete: (result) => {

				var rows = result.data;
				headers = rows[0];
				let rowLength: number = headers.length;

				for(let i: number = 1; i < rows.length; i++)
					if(rows[i].length != rowLength)
						rows.splice(i, 1);

				this.worldConfirmedCovidData.setHeaders(headers);

				for(let i: number = 1; i < rows.length; i++) {

					let countryName: string = rows[i][1];
					let provinceName: string = rows[i][0];
					let latitude: string = rows[i][2];
					let longitude: string = rows[i][3];
					let timeseries: Timeseries[] = this.workhorse.prepareTimeseries(rows[i], headers, 4);

					if(provinceName.length == 0) provinceName = "n/a";

					let coordinates: Coordinate = new Coordinate(latitude, longitude);
					let country: Country = new Country(countryName);
					let province: Province = new Province(provinceName, countryName, coordinates, timeseries);

					if(!this.worldConfirmedCovidData.hasCountryByName(countryName)) this.worldConfirmedCovidData.addCountry(country);
					else country = this.worldConfirmedCovidData.getCountryByName(countryName);
					
					if(!country.hasProvinceByName(provinceName)) country.addProvince(province);
				}

				covidTimeseriesConfirmedCallback();
			}
		});
	}

	// make thi shit DRY
	private prepareCovidWorldRecoveryDataObject(data: any, covidTimeseriesRecoveryCallback: any): void {

		this.covidTimeseriesWorldRecoveryRawData = data;
		let headers: string[];

		this.PAPA.parse(this.covidTimeseriesWorldRecoveryRawData, {

			complete: (result) => {

				var rows = result.data;
				headers = rows[0];
				let rowLength: number = headers.length;

				for(let i: number = 1; i < rows.length; i++)
					if(rows[i].length != rowLength)
						rows.splice(i, 1);

				this.worldRecoveryCovidData.setHeaders(headers);

				for(let i: number = 1; i < rows.length; i++) {

					let countryName: string = rows[i][1];
					let provinceName: string = rows[i][0];
					let latitude: string = rows[i][2];
					let longitude: string = rows[i][3];
					let timeseries: Timeseries[] = this.workhorse.prepareTimeseries(rows[i], headers, 4, true);

					if(provinceName.length == 0) provinceName = "n/a";

					let coordinates: Coordinate = new Coordinate(latitude, longitude);
					let country: Country = new Country(countryName);
					let province: Province = new Province(provinceName, countryName, coordinates, timeseries);

					if(!this.worldRecoveryCovidData.hasCountryByName(countryName)) this.worldRecoveryCovidData.addCountry(country);
					else country = this.worldRecoveryCovidData.getCountryByName(countryName);
					
					if (!country.hasProvinceByName(provinceName)) country.addProvince(province);
				}

				covidTimeseriesRecoveryCallback();
			}
		});
	}

	// make this shit DRY
	private prepareCovidWorldDeathDataObject(data: any, covidTimeseriesDeathCallback: any): void {

		this.covidTimeseriesWorldDataRawData = data;
		let headers: string[];

		this.PAPA.parse(this.covidTimeseriesWorldDataRawData, {

			complete: (result) => {

				var rows = result.data;
				headers = rows[0];
				let rowLength: number = headers.length;

				for(let i: number = 1; i < rows.length; i++)
					if(rows[i].length != rowLength)
						rows.splice(i, 1);

				this.worldDeathCovidData.setHeaders(headers);

				for(let i: number = 1; i < rows.length; i++) {

					let countryName: string = rows[i][1];
					let provinceName: string = rows[i][0];
					let latitude: string = rows[i][2];
					let longitude: string = rows[i][3];
					let timeseries: Timeseries[] = this.workhorse.prepareTimeseries(rows[i], headers, 4);

					if(provinceName.length == 0) provinceName = "n/a";

					let coordinates: Coordinate = new Coordinate(latitude, longitude);
					let country: Country = new Country(countryName);
					let province: Province = new Province(provinceName, countryName, coordinates, timeseries);

					if(!this.worldDeathCovidData.hasCountryByName(countryName)) this.worldDeathCovidData.addCountry(country);
					else country = this.worldDeathCovidData.getCountryByName(countryName);
					
					if (!country.hasProvinceByName(provinceName)) country.addProvince(province);
				}

				covidTimeseriesDeathCallback();
			}
		});
	}













	private setupCovidTimeseriesData(url, initCase, callback: any): void {
		this.loadCovidTimeseriesData(url).subscribe((data: any) => {
			if(initCase == 1) this.prepareCovidIndiaConfirmedDataObject(data, callback);
			else if(initCase == 2) this.prepareCovidIndiaRecoveryDataObject(data, callback);
			else if(initCase == 3) this.prepareCovidIndiaDeathDataObject(data, callback);
			else if(initCase == 4) this.prepareCovidWorldConfirmedDataObject(data, callback);
			else if(initCase == 5) this.prepareCovidWorldRecoveryDataObject(data, callback);
			else if(initCase == 6) this.prepareCovidWorldDeathDataObject(data, callback);
		});
	}

	private loadCovidTimeseriesData(url) {
		return this.http.get(url, { responseType: 'text' });
	}
}
