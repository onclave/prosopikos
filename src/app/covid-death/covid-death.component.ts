import { Component, OnInit, ViewChild } from '@angular/core';

import { WorkhorseService } from '../workhorse.service';
import { CoviddataService } from '../coviddata.service';

import { CovidData } from '../model/covidData';
import { Country } from '../model/country';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
	selector: 'app-covid-death',
	templateUrl: './covid-death.component.html',
	styleUrls: ['./covid-death.component.css', '../covid/covid.component.css']
})
export class CovidDeathComponent implements OnInit {

	private xs: string = '(max-width: 599px)';
	private smMin: string = '(min-width: 600px)';
	private smMax: string = '(max-width: 959px)';
	private mdMin: string = '(min-width: 960px)';
	private mdMax: string = '(max-width: 1279px)';
	private lgMin: string = '(min-width: 1280px)';

	private breakpointObserver: BreakpointObserver;
	private coviddataService: CoviddataService;

	public workhorse: WorkhorseService;
	public covidDeathData: CovidData = new CovidData();

	public isLoading: boolean = true;
	public latestCovidDeathDate: string = '-';
	public COVID_DEATH_MAT_TABLE_DATASCOURCE: MatTableDataSource<any[]>;
	public covidDeathTableDisplayedColumns: string[] = new Array();

	public covidDeathChartDeathRatio = {
		single: [],
		view: [1000, 500],
		gradient: false,
		showLegend: true,
		labels: true,
		legendPosition: 'right',
		doughnut: false,
		colorScheme: {
			domain: [ '#F55F96', '#D70518' ]
		}
	};

	public covidDeathChartDeathRate = {
		multi: [],
		view: [1000, 500],
		showXAxis: true,
		showYAxis: true,
		showLegend: true,
		legendPosition: 'right',
		showXAxisLabel: true,
		showYAxisLabel: true,
		xAxisLabel: "Days",
		yAxisLabel: "Total Deaths",
		colorScheme: {
			domain: [ '#D70518', '#F55F96', '#F2ABC7', '#F2069F', '#F86660', '#BF110C', '#FF1610', '#DE8903', '#E84703' ]
		},
		selectedCountry: 'India',
		latestDays: 14
	};

	public covidDeathChartInfectionToDeathRate = {
		multiComparison: [],
		view: [1000, 500],
		showXAxis: true,
		showYAxis: true,
		showLegend: true,
		legendPosition: 'right',
		showXAxisLabel: true,
		showYAxisLabel: true,
		xAxisLabel: "Days",
		yAxisLabel: "Infection to Deaths",
		colorScheme: {
			domain: [ '#F55F96', '#D70518' ]
		}
	};

	@ViewChild('covidTimeseriesDeathDatatable') covidDeathTable: MatTable<any>;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	constructor(coviddataService: CoviddataService, workhorse: WorkhorseService, breakpointObserver: BreakpointObserver) {

		this.coviddataService = coviddataService;
		this.workhorse = workhorse;
		this.breakpointObserver = breakpointObserver;
	}

	public onSelectCovidDeathRatioChart(event): void {}

	public onSelectCovidDeathCountryProgressChart(event): void {}

	public onSelectorChangeCovidDeathRatioCountry(event: MatSelectChange): void {

		this.covidDeathChartDeathRate.selectedCountry = event.value;
		this.prepareCovidDeathChartDeathCountryProgress(this.covidDeathChartDeathRate.selectedCountry, this.covidDeathChartDeathRate.latestDays);
		this.prepareCovidDeathChartInfectedDeathCountryProgress(this.covidDeathChartDeathRate.selectedCountry, this.covidDeathChartDeathRate.latestDays);
	}

	public onSelectorChangeCovidDeathDaysDeathProgress(event: MatSelectChange): void {

		this.covidDeathChartDeathRate.latestDays = event.value;
		this.prepareCovidDeathChartDeathCountryProgress(this.covidDeathChartDeathRate.selectedCountry, this.covidDeathChartDeathRate.latestDays);
		this.prepareCovidDeathChartInfectedDeathCountryProgress(this.covidDeathChartDeathRate.selectedCountry, this.covidDeathChartDeathRate.latestDays);
	}

	public getCovidTotalInfectionCount(): number {
		return this.workhorse.getCovidTotalInfected(this.coviddataService.getConfirmedCovidData());
	}

	public getCovidTotalInfectionCountByCountry(countryName: string): number {
		return this.workhorse.getCovidInfectedByCountry(this.coviddataService.getConfirmedCovidData(), countryName);
	}

	public getCovidDeathPercent(): number {

		let covidConfirmedData: CovidData = this.coviddataService.getConfirmedCovidData();
		let totalConfirmed: number = this.workhorse.getCovidTotalInfected(covidConfirmedData);
		let totalDeaths: number = this.workhorse.getCovidTotalDeaths(this.covidDeathData);

		return this.workhorse.percentage(totalDeaths, totalConfirmed, 2);
	}

	public getCovidDeathPercentByCountry(countryName: string): number {

		let countryInfected: number = this.workhorse.getCovidInfectedByCountry(this.coviddataService.getConfirmedCovidData(), countryName);

		return this.workhorse.getCovidDeathPercentByCountry(this.covidDeathData, countryName, countryInfected);
	}

	ngOnInit(): void {

		this.coviddataService.init(this.covidDeathCallback, 2);
		this.covidDeathData = this.coviddataService.getDeathCovidData();

		this.breakpointObserver.observe([this.xs]).subscribe((state: BreakpointState) => {
			if(state.matches) {
				
				let width: number = window.innerWidth - 20;

				this.covidDeathChartDeathRatio.view = [width, width + 80];
				this.covidDeathChartDeathRate.view = [width, 300];
				this.covidDeathChartInfectionToDeathRate.view = [width, 300];
				this.covidDeathChartDeathRatio.legendPosition = 'below';
				this.covidDeathChartDeathRate.legendPosition = 'below';
				this.covidDeathChartInfectionToDeathRate.legendPosition = 'below';
			}
		});

		this.breakpointObserver.observe([this.smMin, this.smMax]).subscribe((state: BreakpointState) => {

			if(state[this.smMin] && state[this.smMax]) {
				
				let width: number = window.innerWidth - 20;

				this.covidDeathChartDeathRatio.view = [width, 650];
				this.covidDeathChartDeathRate.view = [width, 400];
				this.covidDeathChartInfectionToDeathRate.view = [width, 400];
				this.covidDeathChartDeathRatio.legendPosition = 'below';
				this.covidDeathChartDeathRate.legendPosition = 'below';
				this.covidDeathChartInfectionToDeathRate.legendPosition = 'below';
			}
		});

		this.breakpointObserver.observe([this.mdMin, this.mdMax]).subscribe((state: BreakpointState) => {

			if(state[this.mdMin] && state[this.mdMax]) {
				
				let width: number = window.innerWidth - 50;

				this.covidDeathChartDeathRatio.view = [width, 650];
				this.covidDeathChartDeathRate.view = [width, 450];
				this.covidDeathChartInfectionToDeathRate.view = [width, 450];
				this.covidDeathChartDeathRatio.legendPosition = 'right';
				this.covidDeathChartDeathRate.legendPosition = 'right';
				this.covidDeathChartInfectionToDeathRate.legendPosition = 'right';
			}
		});

		this.breakpointObserver.observe([this.lgMin]).subscribe((state: BreakpointState) => {
			if(state.matches) {
				
				this.covidDeathChartDeathRatio.view = [1100, 650];
				this.covidDeathChartDeathRate.view = [1100, 550];
				this.covidDeathChartInfectionToDeathRate.view = [1100, 550];
				this.covidDeathChartDeathRatio.legendPosition = 'right';
				this.covidDeathChartDeathRate.legendPosition = 'right';
				this.covidDeathChartInfectionToDeathRate.legendPosition = 'right';
			}
		});
	}

	private covidDeathCallback = function() {

		this.isLoading = false;
		this.latestCovidDeathDate = this.workhorse.getLatestCovidDatasetDate(this.covidDeathData);

		this.prepareCovidDeathTableData()
		this.prepareCovidDeathChartDeathRatio();
		this.prepareCovidDeathChartDeathCountryProgress(this.covidDeathChartDeathRate.selectedCountry, this.covidDeathChartDeathRate.latestDays);
		this.prepareCovidDeathChartInfectedDeathCountryProgress(this.covidDeathChartDeathRate.selectedCountry, this.covidDeathChartDeathRate.latestDays);
	}.bind(this);

	private prepareCovidDeathChartDeathRatio(): void {

		let totalConfirmed: number = this.workhorse.getCovidTotalInfected(this.coviddataService.getConfirmedCovidData());

		if(totalConfirmed < 1)
			setTimeout(() => {
				this.prepareCovidDeathChartDeathRatio();
			}, 500);
		else this.covidDeathChartDeathRatio.single = [{
			"name": "Infected",
			"value": totalConfirmed
		}, {
			"name": "Deaths",
			"value": this.workhorse.getCovidTotalDeaths(this.covidDeathData)
		}];
	}

	private prepareCovidDeathChartDeathCountryProgress(countryName: string, latestDays: number): void {

		let newValues: any[] = new Array();
		let country: Country;

		if(this.covidDeathData.getCountries()) {
			if(this.covidDeathData.hasCountryByName(countryName)) {

				country = this.covidDeathData.getCountryByName(countryName);

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
			
				this.covidDeathChartDeathRate.multi = newValues;
			}
		}
	}

	private prepareCovidDeathChartInfectedDeathCountryProgress(countryName: string, latestDays: number): void {
		this.covidDeathChartInfectionToDeathRate.multiComparison = [{
			"name": "Infection",
			"series": this.workhorse.getCountryTotalInfectionProgress(this.coviddataService.getConfirmedCovidData(), countryName, latestDays)
		}, {
			"name": "Death",
			"series": this.workhorse.getCountryTotalDeathProgress(this.covidDeathData, countryName, latestDays)
		}];
	}

	private prepareCovidDeathTableData(): void {

		this.covidDeathTableDisplayedColumns = this.workhorse.getDatatableFriendlyCovidTimeseriesHeaders(this.covidDeathData.getHeaders());
		this.COVID_DEATH_MAT_TABLE_DATASCOURCE = new MatTableDataSource<any[]>(this.workhorse.getDatatableFriendlyCovidTimeseriesData(this.covidDeathData));

		this.COVID_DEATH_MAT_TABLE_DATASCOURCE.paginator = this.paginator;
	}
}
