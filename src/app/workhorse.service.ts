import { Injectable } from '@angular/core';

import { CovidData } from '../app/model/covidData';
import { Country } from '../app/model/country';
import { Timeseries } from '../app/model/timeseries';
import { Province } from './model/province';
import { CoviddataService } from './coviddata.service';

@Injectable({
	providedIn: 'root'
})
export class WorkhorseService {

	constructor() { }

	public capitalizeFirstLetter(value: string): string {
		return value.toLowerCase().charAt(0).toUpperCase() + value.toLowerCase().slice(1);
	}

	public percentage(numerator, total, decimalPlace): number {
		return +((numerator * 100) / total).toFixed(decimalPlace);
	}

	private makeRandomRange(x) {

		var range = new Array(x), pointer = x;

		return function getRandom() {

			pointer = (pointer - 1 + x) % x;

			var random = Math.floor(Math.random() * pointer);
			var num = (random in range) ? range[random] : random;

			range[random] = (pointer in range) ? range[pointer] : pointer;

			return range[pointer] = num;
		};
	}

	public graphAxisTickNumberFormatter(value: number, fixed: number = 2): string {

		/* https://stackoverflow.com/a/32638472/3640307 */

		if(value === null) return null;
		if(value === 0) return '0';

		fixed = (!fixed || fixed < 0) ? 0 : fixed;

		let b: string[] = (value).toPrecision(2).split("e");
		let k: number = b.length === 1 ? 0 : Math.floor(Math.min(parseFloat(b[1].slice(1)), 14) / 3);
		let c: string = k < 1 ? value.toFixed(0 + fixed) : (value / Math.pow(10, k * 3)).toFixed(1 + fixed);
		let d: number = parseFloat(c) < 0 ? parseFloat(c) : Math.abs(parseFloat(c));
		let e: string = d + ['', 'K', 'M', 'B', 'T'][k];

		return e;
	}

	public graphAxisTickDateFormatter(value: string): string {

		if((value == null) || (value == undefined) || (value == '')) return '';

		let values: string[] = value.split('/');

		if(values.length != 3) return value;

		return values[1] + '/' + values[0];
	}

	// delete this shit
	public doesCountryExist(countries: Country[], name: string): boolean {

		let countryExists: boolean = false;

		for(let country of countries) {
			if(name == country.getName()) {
				countryExists = true;
				break;
			}
		}

		return countryExists;
	}

	// delete this shit
	public doesProvinceExist(country: Country, name: string): boolean {

		let provinceExists: boolean = false;

		for(let province of country.getProvinces()) {
			if(name == province.getName()) {
				provinceExists = true;
				break;
			}
		}

		return provinceExists;
	}

	public getNumberFromCommaSeparatedString(value: string): number {

		let values: string[] = value.split(',');
		let result: string = '';

		for(let v of values) result += v;

		return +result;
	}

	public prepareTimeseries(row: string[], headers: string[], startIndex: number, isRecovery: boolean = false): Timeseries[] {

		let timeseries: Timeseries[] = new Array();

		for(let j: number = startIndex; j < row.length; j++) {

			let date: string = headers[j];

			if(isRecovery) {

				let headerSplit: string[] = date.split('/');

				if(headerSplit[2] == '2020') date = headerSplit[0] + '/' + headerSplit[1] + '/20'; 
			}

			timeseries.push(new Timeseries(date, +row[j]));
		}

		return timeseries;
	}

	public getNumberOfDaysArray(covidData: CovidData, isIndia: boolean = false): number[] {
		return (covidData.getHeaders()) ? (new Array(covidData.getHeaders().length - (isIndia ? 7 : 4))) : [];
	}

	public getSortedRegionNames(covidData: CovidData, countryIndex: number): string[] {

		let regionNames: string[] = new Array();

		if(covidData && covidData.getCountries() && (covidData.getCountries().length > 0)) {

			for(let region of covidData.getCountries()[countryIndex].getProvinces()) regionNames.push(region.getName());
			regionNames.sort();
		}

		return regionNames;
	}

	public getSortedCountryNames(covidData: CovidData): string[] {

		let countryNames: string[] = new Array();

		if(covidData.getCountries()) {

			for(let country of covidData.getCountries()) countryNames.push(country.getName());

			countryNames.sort();
		}

		return countryNames;
	}

	public selectAllProvinces(covidData: CovidData): Province[] {

		let allProvinces: Province[] = new Array();

		if(covidData && covidData.getCountries() && (covidData.getCountries().length > 0))
			for(let country of covidData.getCountries()) allProvinces.push(...country.getProvinces());

		return allProvinces;
	}

	public selectNRandomProvinces(covidData: CovidData, n: number, poolSize: number): Province[] {

		let selectedProvinces: Province[] = new Array();

		if(covidData && covidData.getCountries() && (covidData.getCountries().length > 0)) {

			let generator: any = this.makeRandomRange(poolSize);
			let provinces: Province[] = this.selectAllProvinces(covidData);
			
			for(let i: number = 0; i < n; i++) selectedProvinces.push(provinces[generator()]);
		}

		return selectedProvinces;
	}

	public getDatatableFriendlyCovidIndiaTimeseriesHeaders(headers: string[]): string[] {
		
		let friendlyHeaders: string[] = new Array();

		for(let i: number = 0; i < headers.length; i++) {

            let value: string = headers[i];

			if(i == 0) value = "state";
			else if(i == 1) value = "code";
            else if(i == 2) value = "latitude";
            else if(i == 3) value = "longitude";
			else if(i == 4) value = "perCapitaIncome";
			else if(i == 5) value = "population";
			else if(i == 6) value = "avgTemperature";
            else value = "day_" + (i - 6);

            friendlyHeaders.push(value);
		}

        return friendlyHeaders;
	}

	public getDatatableFriendlyCovidTimeseriesHeaders(headers: string[]): string[] {

		let friendlyHeaders: string[] = new Array();

        for(let i: number = 0; i < headers.length; i++) {

            let value: string = headers[i];

            if(i == 0) value = "province";
            else if(i == 1) value = "country";
            else if(i == 2) value = "lat";
            else if(i == 3) value = "long";
            else value = "day_" + (i - 3);

            friendlyHeaders.push(value);
		}

        return friendlyHeaders;
	}

	public getDatatableFriendlyCovidIndiaTimeseriesData(covidData: CovidData): any[] {

		let datasource: any[] = new Array();
		let country: Country = covidData.getCountries()[0];

		for(let province of country.getProvinces()) {

			let entry = {};
			let dayCount: number = 0;

			entry['state'] = province.getName();
			entry['code'] = province.getProvinceCode();
			entry['latitude'] = province.getCoordinates().getLatitude();
			entry['longitude'] = province.getCoordinates().getLongitude();
			entry['perCapitaIncome'] = province.getPerCapitaIncome();
			entry['population'] = province.getPopulation();
			entry['avgTemperature'] = province.getAvgTemperature();

			for(let timeseries of province.getTimeseries()) entry['day_' + ++dayCount] = timeseries.getValue();

			datasource.push(entry);
		}

		return datasource;
	}

	public getDatatableFriendlyCovidTimeseriesData(covidData: CovidData): any[] {

		let datasource: any[] = new Array();
		let countries: Country[] = covidData.getCountries();

		for(let country of countries) {
			for(let province of country.getProvinces()) {

				let entry = {};
				let dayCount: number = 0;

				entry['country'] = country.getName();
				entry['province'] = province.getName();
				entry['lat'] = province.getCoordinates().getLatitude();
				entry['long'] = province.getCoordinates().getLongitude();

				for(let timeseries of province.getTimeseries()) entry['day_' + ++dayCount] = timeseries.getValue();

				datasource.push(entry);
			}			
		}

		return datasource;
	}

	///////START////////
	public getLatestCovidDatasetDate(covidData: CovidData): string {
		return covidData.getCountries()[0].getProvinces()[0].getLastTimeseries().getDate();
	}

	public getCovidTotalInfected(covidConfirmedData: CovidData): number {
		return this.getCovidLatestColumnTotal(covidConfirmedData);
	}

	public getCovidTotalDeaths(covidDeathData: CovidData): number {
		return this.getCovidLatestColumnTotal(covidDeathData);
	}

	public getCovidTotalRecovered(covidRecoveryData: CovidData): number {
		return this.getCovidLatestColumnTotal(covidRecoveryData);
	}

	private getCovidLatestColumnTotal(covidData: CovidData): number {

		let total: number = 0;

		if(covidData.getCountries())
			for(let country of covidData.getCountries())
				for(let province of country.getProvinces())
					total += province.getLastTimeseries().getValue();

		return total;
	}
	///////END////////

	public getCovidTotalAffected(covidData: CovidData): number {

		let total: number = 0;

		if(covidData.getCountries())
			for(let country of covidData.getCountries())
				for(let province of country.getProvinces())
					total += province.getLastTimeseries().getValue();

		return total;
	}

	public getCovidAffectedByCountry(covidData: CovidData, countryName: string): number {

		let total: number = 0;

		if(covidData.getCountries()) {

			let country: Country = covidData.getCountryByName(countryName);

			if(country)
				for(let province of country.getProvinces())
					total += province.getLastTimeseries().getValue();
		}

		return total;
	}

	public getCovidAffectedByRegion(covidData: CovidData, countryName: string, regionName: string): number {

		if(covidData.getCountries()) {

			let country: Country = covidData.getCountryByName(countryName);

			if(country) {

				let region: Province = country.getProvinceByName(regionName);

				if(region) return region.getLastTimeseries().getValue();
			}
		}

		return 0;
	}

	///////START////////
	public getCovidInfectedByCountry(covidConfirmedData: CovidData, countryName: string): number {

		let total: number = 0;

		if(covidConfirmedData.getCountries()) {

			let country: Country = covidConfirmedData.getCountryByName(countryName);

			if(country)
				for(let province of country.getProvinces())
					total += province.getLastTimeseries().getValue();
		}

		return total;
	}

	public getCovidDeathsByCountry(covidDeathData: CovidData, countryName: string): number {

		let total: number = 0;

		if(covidDeathData.getCountries()) {

			let country: Country = covidDeathData.getCountryByName(countryName);

			if(country)
				for(let province of country.getProvinces())
					total += province.getLastTimeseries().getValue();
		}

		return total;
	}

	public getCovidRecoveryByCountry(covidRecoveryData: CovidData, countryName: string): number {

		let total: number = 0;

		if(covidRecoveryData.getCountries()) {

			let country: Country = covidRecoveryData.getCountryByName(countryName);

			if(country)
				for(let province of country.getProvinces())
					total += province.getLastTimeseries().getValue();
		}

		return total;
	}
	///////END////////

	public getCovidDeathPercentByCountry(covidDeathData: CovidData, countryName: string, countryInfected: number): number {
		return +this.percentage(this.getCovidDeathsByCountry(covidDeathData, countryName), countryInfected, 2);
	}

	public getCovidRecoveryPercentByCountry(covidRecoveryData: CovidData, countryName: string, countryInfected: number): number {
		return +this.percentage(this.getCovidRecoveryByCountry(covidRecoveryData, countryName), countryInfected, 2);
	}

	public getRegionTotalAffectedProgress(covidData: CovidData, countryName: string, regionName: string, latestDays: number): any[] {

		let series: any[] = new Array();

		if((regionName != '') && covidData && covidData.getCountries() && (covidData.getCountries().length > 0)) {
			if(covidData.hasCountryByName(countryName)) {

				let country: Country = covidData.getCountryByName(countryName);

				if(country.hasProvinceByName(regionName)) {

					let province: Province = country.getProvinceByName(regionName);

					for(let i: number = 0; i < latestDays; i++) series.push({
						"name": province.getLatestNTimeseries(latestDays)[i].getDate(),
						"value": province.getLatestNTimeseries(latestDays)[i].getValue()
					});
				}
			}
		}

		return series;
	}

	public getCountryTotalAffectedProgress(covidData: CovidData, countryName: string, latestDays: number): any[] {

		let series: any[] = new Array();

		if(covidData && covidData.getCountries() && (covidData.getCountries().length > 0)) {
			if(covidData.hasCountryByName(countryName)) {

				let country: Country = covidData.getCountryByName(countryName);

				for(let i: number = 0; i < latestDays; i++) {

					let totalAffectedPerDay: number = 0;

					for(let province of country.getProvinces()) totalAffectedPerDay += province.getLatestNTimeseries(latestDays)[i].getValue();

					series.push({
						"name": country.getProvinces()[0].getLatestNTimeseries(latestDays)[i].getDate(),
						"value": totalAffectedPerDay
					});
				}
			}
		}

		return series;
	}

	public getWorldAffectedProgress(covidData: CovidData, latestDays: number): any[] {

		let series: any[] = new Array();

		if(covidData && covidData.getCountries() && (covidData.getCountries().length > 0)) {

			for(let i: number = 0; i < latestDays; i++) {

				let totalAffectedPerDay: number = 0;

				for(let country of covidData.getCountries())
					for(let province of country.getProvinces())
						totalAffectedPerDay += province.getLatestNTimeseries(latestDays)[i].getValue();

				series.push({
					"name": covidData.getCountries()[0].getProvinces()[0].getLatestNTimeseries(latestDays)[i].getDate(),
					"value": totalAffectedPerDay
				});
			}
		}

		return series;
	}

	///////START////////
	public getCountryTotalInfectionProgress(covidConfirmedData: CovidData, countryName: string, latestDays: number): any[] {

		let series: any[] = new Array();

		if(covidConfirmedData.getCountries())
			if(covidConfirmedData.hasCountryByName(countryName)) {

				let country: Country = covidConfirmedData.getCountryByName(countryName);
				let provinces: Province[] = country.getProvinces();

				for(let i: number = 0; i < latestDays; i++) {

					let totalInfectionPerDay: number = 0;

					for(let province of provinces)
						totalInfectionPerDay += province.getLatestNTimeseries(latestDays)[i].getValue();

					series.push({
						"name": provinces[0].getLatestNTimeseries(latestDays)[i].getDate(),
						"value": totalInfectionPerDay
					});
				}
			}

		return series;
	}

	public getCountryTotalDeathProgress(covidDeathData: CovidData, countryName: string, latestDays: number): any[] {

		let series: any[] = new Array();

		if(covidDeathData.getCountries())
			if(covidDeathData.hasCountryByName(countryName)) {

				let country: Country = covidDeathData.getCountryByName(countryName);
				let provinces: Province[] = country.getProvinces();

				for(let i: number = 0; i < latestDays; i++) {

					let totalDeathsPerDay: number = 0;

					for(let province of provinces)
						totalDeathsPerDay += province.getLatestNTimeseries(latestDays)[i].getValue();

					series.push({
						"name": provinces[0].getLatestNTimeseries(latestDays)[i].getDate(),
						"value": totalDeathsPerDay
					});
				}
			}

		return series;
	}

	public getCountryTotalRecoveryProgress(covidRecoveryData: CovidData, countryName: string, latestDays: number, covidDataService: CoviddataService = null, inComparison: boolean = false): any[] {

		let series: any[] = new Array();

		if(covidDataService && inComparison) {

			// https://github.com/bumbeishvili/covid19-daily-data

			let covidConfirmedData: CovidData = covidDataService.getConfirmedCovidData();

			if(covidRecoveryData.getHeaders().length < covidConfirmedData.getHeaders().length) --latestDays;
		}

		if(covidRecoveryData.getCountries())
			if(covidRecoveryData.hasCountryByName(countryName)) {

				let country: Country = covidRecoveryData.getCountryByName(countryName);
				let provinces: Province[] = country.getProvinces();

				for(let i: number = 0; i < latestDays; i++) {

					let totalRecoveredPerDay: number = 0;

					for(let province of provinces)
					totalRecoveredPerDay += province.getLatestNTimeseries(latestDays)[i].getValue();

					series.push({
						"name": provinces[0].getLatestNTimeseries(latestDays)[i].getDate(),
						"value": totalRecoveredPerDay
					});
				}
			}

		return series;
	}
	///////END////////
}
