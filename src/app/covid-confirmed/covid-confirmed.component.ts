import { Component, OnInit, ViewChild } from '@angular/core';

import { WorkhorseService } from '../workhorse.service';
import { CoviddataService } from '../coviddata.service';

import { CovidData } from '../model/covidData';
import { Country } from '../model/country';
import { Timeseries } from '../model/timeseries';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSliderChange } from '@angular/material/slider';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CovidMapService } from '../covid-map.service';
import { CovidAnalysisService } from '../covid-analysis.service';

@Component({
	selector: 'app-covid-confirmed',
	templateUrl: './covid-confirmed.component.html',
	styleUrls: ['./covid-confirmed.component.css', '../covid/covid.component.css']
})
export class CovidConfirmedComponent implements OnInit {

	private xs: string = '(max-width: 599px)';
	private smMin: string = '(min-width: 600px)';
	private smMax: string = '(max-width: 959px)';
	private mdMin: string = '(min-width: 960px)';
	private mdMax: string = '(max-width: 1279px)';
	private lgMin: string = '(min-width: 1280px)';

	private breakpointObserver: BreakpointObserver;
	private coviddataService: CoviddataService;
	private covidMapService: CovidMapService;
	private covidAnalysisService: CovidAnalysisService;

	public workhorse: WorkhorseService;
	public covidConfirmedData: CovidData = new CovidData();

	public isLoading: boolean = true;
	public latestCovidConfirmedDate: string = '-';
	public COVID_CONFIRMED_MAT_TABLE_DATASCOURCE: MatTableDataSource<any[]>;
	public covidConfirmedTableDisplayedColumns: string[] = new Array();

	public covidConfirmedChartInfectedCountry = {
		single: [],
		view: [1000, 500],
		showXAxis: true,
		showYAxis: true,
		gradient: false,
		showLegend: false,
		showXAxisLabel: true,
		showYAxisLabel: true,
		xAxisLabel: "Country",
		yAxisLabel: "Total Infection",
		colorScheme: {
			domain: [ '#D70518', '#F55F96', '#F2ABC7', '#F2069F', '#F86660', '#BF110C', '#FF1610', '#DE8903', '#E84703' ]
		},
		selectedCountryCount: 10
	};

	public covidConfirmedChartInfectedCountryProportion = {
		single: [],
		view: [1000, 500],
		label: "Infected",
		colorScheme: {
			domain: [ '#D70518', '#F55F96', '#F2ABC7', '#F2069F', '#F86660', '#BF110C', '#FF1610', '#DE8903', '#E84703' ]
		},
		selectedCountryCount: 5
	};

	public covidConfirmedChartInfectedCountryInfectionProgress = {
		multi: [],
		view: [1000, 500],
		showXAxis: true,
		showYAxis: true,
		showLegend: true,
		legendPosition: 'right',
		showXAxisLabel: true,
		showYAxisLabel: true,
		xAxisLabel: "Date",
		yAxisLabel: "Total Infection",
		colorScheme: {
			domain: [ '#D70518', '#F55F96', '#F2ABC7', '#F2069F', '#F86660', '#BF110C', '#FF1610', '#DE8903', '#E84703' ]
		},
		selectedCountry: 'India',
		latestDays: 14
	};

	@ViewChild('covidTimeseriesConfirmedDatatable') covidConfirmedTable: MatTable<any>;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	constructor(coviddataService: CoviddataService, workhorse: WorkhorseService, covidMapService: CovidMapService, covidAnalysisService: CovidAnalysisService, breakpointObserver: BreakpointObserver) {

		this.coviddataService = coviddataService;
		this.workhorse = workhorse;
		this.covidMapService = covidMapService;
		this.covidAnalysisService = covidAnalysisService;
		this.breakpointObserver = breakpointObserver;
	}

	ngOnInit(): void {

		this.coviddataService.init(this.covidConfirmedCallback, 1);
		this.covidConfirmedData = this.coviddataService.getConfirmedCovidData();
		
		this.breakpointObserver.observe([this.xs]).subscribe((state: BreakpointState) => {
			if(state.matches) {
				
				let width: number = window.innerWidth - 20;

				this.covidConfirmedChartInfectedCountry.view = [width, 300];
				this.covidConfirmedChartInfectedCountryProportion.view = [width, 600];
				this.covidConfirmedChartInfectedCountryInfectionProgress.view = [width, 300];
				this.covidConfirmedChartInfectedCountryInfectionProgress.legendPosition = 'below';
			}
		});

		this.breakpointObserver.observe([this.smMin, this.smMax]).subscribe((state: BreakpointState) => {

			if(state[this.smMin] && state[this.smMax]) {
				
				let width: number = window.innerWidth - 20;

				this.covidConfirmedChartInfectedCountry.view = [width, 400];
				this.covidConfirmedChartInfectedCountryProportion.view = [width, 650];
				this.covidConfirmedChartInfectedCountryInfectionProgress.view = [width, 400];
				this.covidConfirmedChartInfectedCountryInfectionProgress.legendPosition = 'below';
			}
		});

		this.breakpointObserver.observe([this.mdMin, this.mdMax]).subscribe((state: BreakpointState) => {

			if(state[this.mdMin] && state[this.mdMax]) {
				
				let width: number = window.innerWidth - 50;

				this.covidConfirmedChartInfectedCountry.view = [width, 450];
				this.covidConfirmedChartInfectedCountryProportion.view = [width, 650];
				this.covidConfirmedChartInfectedCountryInfectionProgress.view = [width, 450];
				this.covidConfirmedChartInfectedCountryInfectionProgress.legendPosition = 'right';
			}
		});

		this.breakpointObserver.observe([this.lgMin]).subscribe((state: BreakpointState) => {
			if(state.matches) {
				
				this.covidConfirmedChartInfectedCountry.view = [1100, 550];
				this.covidConfirmedChartInfectedCountryProportion.view = [1100, 600];
				this.covidConfirmedChartInfectedCountryInfectionProgress.view = [1100, 550];
				this.covidConfirmedChartInfectedCountryInfectionProgress.legendPosition = 'right';
			}
		});
	}

	public onSelectCovidConfirmedInfectedCountryChart(event): void {}

	public onSelectCovidConfirmedInfectedCountryProportionChart(event): void {}

	public onSelectCovidConfirmedInfectedCountryProgressChart(event): void {}

	public getSortedCountryNames(): string[] {

		let countryNames: string[] = new Array();

		if(this.covidConfirmedData.getCountries()) {

			for(let country of this.covidConfirmedData.getCountries()) countryNames.push(country.getName());

			countryNames.sort();
		}

		return countryNames;
	}

	public onSliderChangeCovidConfirmedCountriesInfected(event: MatSliderChange): void {

		this.covidConfirmedChartInfectedCountry.selectedCountryCount = event.value;
		this.prepareCovidConfirmedChartInfectedCountry(this.covidConfirmedChartInfectedCountry.selectedCountryCount);
	}

	public onSliderChangeCovidConfirmedCountriesInfectedProportion(event: MatSliderChange): void {

		this.covidConfirmedChartInfectedCountryProportion.selectedCountryCount = event.value;
		this.prepareCovidConfirmedChartInfectedCountryProportion(this.covidConfirmedChartInfectedCountryProportion.selectedCountryCount);
	}

	public onSelectorChangeCovidConfirmedCountryInfectionProgress(event: MatSelectChange): void {

		this.covidConfirmedChartInfectedCountryInfectionProgress.selectedCountry = event.value;
		this.prepareCovidConfirmedChartInfectedCountryProgress(this.covidConfirmedChartInfectedCountryInfectionProgress.selectedCountry, this.covidConfirmedChartInfectedCountryInfectionProgress.latestDays);
	}

	public onSelectorChangeCovidConfirmedDaysInfectionProgress(event: MatSelectChange): void {

		this.covidConfirmedChartInfectedCountryInfectionProgress.latestDays = event.value;
		this.prepareCovidConfirmedChartInfectedCountryProgress(this.covidConfirmedChartInfectedCountryInfectionProgress.selectedCountry, this.covidConfirmedChartInfectedCountryInfectionProgress.latestDays);
	}

	public getConvidConfirmedHighestCountryInfected(): string {

		let infectedCountry: string = "-";
		let maxInfection: number = 0;

		for(let country of this.covidConfirmedData.getCountries()) {

			let totalInfection: number = 0;

			for(let province of country.getProvinces()) {
				totalInfection += province.getLastTimeseries().getValue();
			}

			if(maxInfection < totalInfection) {

				maxInfection = totalInfection;
				infectedCountry = country.getName();
			}
		}

		return infectedCountry;
	}

	public getConvidConfirmedHighestCountryInfectionCount(): number {

		let maxInfection: number = 0;

		for(let country of this.covidConfirmedData.getCountries()) {

			let totalInfection: number = 0;

			for(let province of country.getProvinces()) totalInfection += province.getLastTimeseries().getValue();

			if(maxInfection < totalInfection) maxInfection = totalInfection;
		}

		return maxInfection;
	}

	public getConvidConfirmedTotalNumberOfCountriesInfected(): number {

		let totalCount: number = 0;

		if(this.covidConfirmedData.getCountries()) {

			for(let country of this.covidConfirmedData.getCountries()) {

				let infected: number = 0;

				for(let province of country.getProvinces()) infected += province.getLastTimeseries().getValue();

				if(infected > 0) totalCount++;
			}
		}

		return totalCount;
	}

	public getConvidConfirmedIndiaInfectionCount(): number {

		let india: Country;
		let totalInfection: number = 0;

		if(this.covidConfirmedData.getCountries()) {
			if(this.covidConfirmedData.hasCountryByName('India')) {

				india = this.covidConfirmedData.getCountryByName('India');
			
				for(let province of india.getProvinces()) totalInfection += province.getLastTimeseries().getValue();
			}
		}

		return totalInfection;
	}

	public getConvidConfirmedHighestCountrySpike(): number {

		let country: Country;
		let spike: number = 0;

		if(this.covidConfirmedData.getCountries()) {

			let countryName: string = this.getConvidConfirmedHighestCountryInfected();

			if(this.covidConfirmedData.hasCountryByName(countryName)) {

				country = this.covidConfirmedData.getCountryByName(countryName);
				
				for(let province of country.getProvinces()) {

					let timeseries: Timeseries[] = province.getTimeseries();

					for(let i: number = 0; i < timeseries.length - 1; i++) {

						let singleSpike: number = timeseries[i + 1].getValue() - timeseries[i].getValue();

						if(spike < singleSpike) spike = singleSpike;
					}
				}
			}
		}

		return spike;
	}

	public getConvidConfirmedHighestCountrySpikeProvince(): string {

		let country: Country;
		let spike: number = 0;
		let provinceName: string = "-";

		if(this.covidConfirmedData.getCountries()) {

			let countryName: string = this.getConvidConfirmedHighestCountryInfected();

			if(this.covidConfirmedData.hasCountryByName(countryName)) {

				country = this.covidConfirmedData.getCountryByName(countryName);
				
				for(let province of country.getProvinces()) {

					let timeseries: Timeseries[] = province.getTimeseries();

					for(let i: number = 0; i < timeseries.length - 1; i++) {

						let singleSpike: number = timeseries[i + 1].getValue() - timeseries[i].getValue();

						if(spike < singleSpike) {

							spike = singleSpike;
							provinceName = province.getName();
						}
					}
				}
			}
		}

		return provinceName;
	}

	public getConvidConfirmedHighestCountrySpikeDay(): string {

		let country: Country;
		let spike: number = 0;
		let spikeDay: string = "-";

		if(this.covidConfirmedData.getCountries()) {

			let countryName: string = this.getConvidConfirmedHighestCountryInfected();

			if(this.covidConfirmedData.hasCountryByName(countryName)) {

				country = this.covidConfirmedData.getCountryByName(countryName);
				
				for(let province of country.getProvinces()) {

					let timeseries: Timeseries[] = province.getTimeseries();

					for(let i: number = 0; i < timeseries.length - 1; i++) {

						let singleSpike: number = timeseries[i + 1].getValue() - timeseries[i].getValue();

						if(spike < singleSpike) {

							spike = singleSpike;
							spikeDay = timeseries[i].getDate() + " to " + timeseries[i + 1].getDate();
						}
					}
				}
			}
		}

		return spikeDay;
	}

	public getConvidConfirmedIndiaSpike(): number {

		let india: Country;
		let spike: number = 0;

		if(this.covidConfirmedData.getCountries()) {
			if(this.covidConfirmedData.hasCountryByName('India')) {

				india = this.covidConfirmedData.getCountryByName('India');
			
				for(let province of india.getProvinces()) {

					let timeseries: Timeseries[] = province.getTimeseries();

					for(let i: number = 0; i < timeseries.length - 1; i++) {

						let singleSpike: number = timeseries[i + 1].getValue() - timeseries[i].getValue();

						if(spike < singleSpike) spike = singleSpike;
					}
				}
			}
		}

		return spike;
	}

	public getConvidConfirmedIndiaSpikeDay(): string {

		let india: Country;
		let spike: number = 0;
		let spikeDay: string = "-";

		if(this.covidConfirmedData.getCountries()) {
			if(this.covidConfirmedData.hasCountryByName('India')) {

				india = this.covidConfirmedData.getCountryByName('India');
			
				for(let province of india.getProvinces()) {

					let timeseries: Timeseries[] = province.getTimeseries();

					for(let i: number = 0; i < timeseries.length - 1; i++) {

						let singleSpike: number = timeseries[i + 1].getValue() - timeseries[i].getValue();

						if(spike < singleSpike) {

							spike = singleSpike;
							spikeDay = timeseries[i].getDate() + " to " + timeseries[i + 1].getDate();
						}
					}
				}
			}
		}

		return spikeDay;
	}

	private covidConfirmedCallback = function() {

		this.isLoading = false;
		this.latestCovidConfirmedDate = this.workhorse.getLatestCovidDatasetDate(this.covidConfirmedData);

		this.prepareCovidConfirmedTableData()
		this.covidMapService.initMap(this.covidMapService.getMapObject(), this.covidConfirmedData, this.coviddataService.getDeathCovidData(), false);
		this.covidAnalysisService.prepareCovidAnalysisTemperatureToInfectionLineGraph(this.workhorse.selectNRandomProvinces(this.covidConfirmedData, this.covidAnalysisService.getCovidAnalysisTemperatureToInfectionLineGraph().totalSelection, this.getConvidConfirmedTotalNumberOfCountriesInfected()));





		this.covidAnalysisService.prepareCovidAnalysisTemperatureToInfectionSelectedLineGraph(this.workhorse.selectAllProvinces(this.covidConfirmedData), this.covidAnalysisService.getCovidAnalysisTemperatureToInfectionSelectedLineGraph().chunks, this.covidAnalysisService.getCovidAnalysisTemperatureToInfectionSelectedLineGraph().latestDays);






		this.prepareCovidConfirmedChartInfectedCountry(this.covidConfirmedChartInfectedCountry.selectedCountryCount);
		this.prepareCovidConfirmedChartInfectedCountryProportion(this.covidConfirmedChartInfectedCountryProportion.selectedCountryCount);
		this.prepareCovidConfirmedChartInfectedCountryProgress(this.covidConfirmedChartInfectedCountryInfectionProgress.selectedCountry, this.covidConfirmedChartInfectedCountryInfectionProgress.latestDays);
	}.bind(this);

	private prepareCovidConfirmedChartInfectedCountry(selection: number): void {

		let newValues: any[] = new Array();
		let topSelected: any[] = new Array();

		for(let country of this.covidConfirmedData.getCountries()) {

			let totalInfection: number = 0;

			for(let province of country.getProvinces()) totalInfection += province.getLastTimeseries().getValue();

			newValues.push({
				"name": country.getName(),
				"value": totalInfection
			});
		}

		newValues.sort((a, b) => b.value - a.value);

		for(let i: number = 0; i < selection; i++) topSelected.push(newValues[i]);

		this.covidConfirmedChartInfectedCountry.single = topSelected;
	}

	private prepareCovidConfirmedChartInfectedCountryProportion(selection: number): void {

		let newValues: any[] = new Array();
		let topSelected: any[] = new Array();

		for(let country of this.covidConfirmedData.getCountries()) {

			let totalInfection: number = 0;

			for(let province of country.getProvinces()) totalInfection += province.getLastTimeseries().getValue();

			newValues.push({
				"name": country.getName(),
				"value": totalInfection
			});
		}

		newValues.sort((a, b) => b.value - a.value);

		for(let i: number = 0; i < selection; i++) topSelected.push(newValues[i]);

		this.covidConfirmedChartInfectedCountryProportion.single = topSelected;
	}

	private prepareCovidConfirmedChartInfectedCountryProgress(countryName: string, latestDays: number): void {

		let newValues: any[] = new Array();
		let country: Country;

		if(this.covidConfirmedData.getCountries()) {
			if(this.covidConfirmedData.hasCountryByName(countryName)) {

				country = this.covidConfirmedData.getCountryByName(countryName);

				for(let province of country.getProvinces()) {

					let provinceName: string = province.getName();
					let series: any[] = new Array();

					if(provinceName == 'n/a') provinceName = country.getName();

					for(let timeseries of province.getLatestNTimeseries(latestDays)) {
						series.push({
							"value": timeseries.getValue(),
							"name": timeseries.getDate()
						});
					}

					newValues.push({
						"name": provinceName,
						"series": series
					});
				}
			
				this.covidConfirmedChartInfectedCountryInfectionProgress.multi = newValues;
			}
		}
	}

	private prepareCovidConfirmedTableData(): void {

		this.covidConfirmedTableDisplayedColumns = this.workhorse.getDatatableFriendlyCovidTimeseriesHeaders(this.covidConfirmedData.getHeaders());
		this.COVID_CONFIRMED_MAT_TABLE_DATASCOURCE = new MatTableDataSource<any[]>(this.workhorse.getDatatableFriendlyCovidTimeseriesData(this.covidConfirmedData));

		this.COVID_CONFIRMED_MAT_TABLE_DATASCOURCE.paginator = this.paginator;
	}
}
