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
	selector: 'app-covid-recovered',
	templateUrl: './covid-recovered.component.html',
	styleUrls: ['./covid-recovered.component.css', '../covid/covid.component.css']
})
export class CovidRecoveredComponent implements OnInit {

	private xs: string = '(max-width: 599px)';
	private smMin: string = '(min-width: 600px)';
	private smMax: string = '(max-width: 959px)';
	private mdMin: string = '(min-width: 960px)';
	private mdMax: string = '(max-width: 1279px)';
	private lgMin: string = '(min-width: 1280px)';

	private breakpointObserver: BreakpointObserver;
	private coviddataService: CoviddataService;

	public workhorse: WorkhorseService;
	public covidRecoveryData: CovidData = new CovidData();

	public isLoading: boolean = true;
	public latestCovidRecoveryDate: string = '-';
	public COVID_RECOVERY_MAT_TABLE_DATASCOURCE: MatTableDataSource<any[]>;
	public covidRecoveryTableDisplayedColumns: string[] = new Array();

	public covidRecoveryChartRecoveryRatio = {
		single: [],
		view: [1000, 500],
		gradient: false,
		showLegend: true,
		labels: true,
		legendPosition: 'right',
		doughnut: false,
		colorScheme: {
			domain: [ '#F55F96', '#D70518', '#F2ABC7' ]
		}
	};

	public covidRecoveryChartRecoveryRate = {
		multi: [],
		view: [1000, 500],
		showXAxis: true,
		showYAxis: true,
		showLegend: true,
		legendPosition: 'right',
		showXAxisLabel: true,
		showYAxisLabel: true,
		xAxisLabel: "Days",
		yAxisLabel: "Total Recoveries",
		colorScheme: {
			domain: [ '#D70518', '#F55F96', '#F2ABC7', '#F2069F', '#F86660', '#BF110C', '#FF1610', '#DE8903', '#E84703' ]
		},
		selectedCountry: 'India',
		latestDays: 14
	};

	public covidDeathChartInfectionToDeathToRecoveryRate = {
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
			domain: [ '#F55F96', '#D70518', '#F2ABC7' ]
		}
	};
  
	@ViewChild('covidTimeseriesRecoveryDatatable') covidRecoveryTable: MatTable<any>;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	constructor(coviddataService: CoviddataService, workhorse: WorkhorseService, breakpointObserver: BreakpointObserver) {

		this.coviddataService = coviddataService;
		this.workhorse = workhorse;
		this.breakpointObserver = breakpointObserver;
	}

	ngOnInit(): void {

		this.coviddataService.init(this.covidRecoveryCallback, 3);
		this.covidRecoveryData = this.coviddataService.getRecoveryCovidData();

		this.breakpointObserver.observe([this.xs]).subscribe((state: BreakpointState) => {
			if(state.matches) {
				
				let width: number = window.innerWidth - 20;

				this.covidRecoveryChartRecoveryRatio.view = [width, width + 80];
				this.covidRecoveryChartRecoveryRate.view = [width, 300];
				this.covidDeathChartInfectionToDeathToRecoveryRate.view = [width, 300];
				this.covidRecoveryChartRecoveryRatio.legendPosition = 'below';
				this.covidRecoveryChartRecoveryRate.legendPosition = 'below';
				this.covidDeathChartInfectionToDeathToRecoveryRate.legendPosition = 'below';
			}
		});

		this.breakpointObserver.observe([this.smMin, this.smMax]).subscribe((state: BreakpointState) => {

			if(state[this.smMin] && state[this.smMax]) {
				
				let width: number = window.innerWidth - 20;

				this.covidRecoveryChartRecoveryRatio.view = [width, 650];
				this.covidRecoveryChartRecoveryRate.view = [width, 400];
				this.covidDeathChartInfectionToDeathToRecoveryRate.view = [width, 400];
				this.covidRecoveryChartRecoveryRatio.legendPosition = 'below';
				this.covidRecoveryChartRecoveryRate.legendPosition = 'below';
				this.covidDeathChartInfectionToDeathToRecoveryRate.legendPosition = 'below';
			}
		});

		this.breakpointObserver.observe([this.mdMin, this.mdMax]).subscribe((state: BreakpointState) => {

			if(state[this.mdMin] && state[this.mdMax]) {
				
				let width: number = window.innerWidth - 50;

				this.covidRecoveryChartRecoveryRatio.view = [width, 650];
				this.covidRecoveryChartRecoveryRate.view = [width, 450];
				this.covidDeathChartInfectionToDeathToRecoveryRate.view = [width, 450];
				this.covidRecoveryChartRecoveryRatio.legendPosition = 'right';
				this.covidRecoveryChartRecoveryRate.legendPosition = 'right';
				this.covidDeathChartInfectionToDeathToRecoveryRate.legendPosition = 'right';
			}
		});

		this.breakpointObserver.observe([this.lgMin]).subscribe((state: BreakpointState) => {
			if(state.matches) {
				
				this.covidRecoveryChartRecoveryRatio.view = [1100, 650];
				this.covidRecoveryChartRecoveryRate.view = [1100, 550];
				this.covidDeathChartInfectionToDeathToRecoveryRate.view = [1100, 550];
				this.covidRecoveryChartRecoveryRatio.legendPosition = 'right';
				this.covidRecoveryChartRecoveryRate.legendPosition = 'right';
				this.covidDeathChartInfectionToDeathToRecoveryRate.legendPosition = 'right';
			}
		});
	}

	public onSelectCovidRecoveryRatioChart(event): void {}

	public onSelectCovidRecoveryCountryProgressChart(event): void {}

	public getCovidTotalInfectionCount(): number {
		return this.workhorse.getCovidTotalInfected(this.coviddataService.getConfirmedCovidData());
	}

	public getCovidTotalInfectionCountByCountry(countryName: string): number {
		return this.workhorse.getCovidInfectedByCountry(this.coviddataService.getConfirmedCovidData(), countryName);
	}

	public getCovidTotalDeathCount(): number {
		return this.workhorse.getCovidTotalDeaths(this.coviddataService.getDeathCovidData());
	}

	public onSelectorChangeCovidRecoveryRatioCountry(event: MatSelectChange): void {

		this.covidRecoveryChartRecoveryRate.selectedCountry = event.value;
		this.prepareCovidRecoveryChartRecoveryCountryProgress(this.covidRecoveryChartRecoveryRate.selectedCountry, this.covidRecoveryChartRecoveryRate.latestDays);
		this.prepareCovidDeathChartInfectedDeathRecoveryCountryProgress(this.covidRecoveryChartRecoveryRate.selectedCountry, this.covidRecoveryChartRecoveryRate.latestDays);
	}

	public onSelectorChangeCovidRecoveryDaysRecoveryProgress(event: MatSelectChange): void {

		this.covidRecoveryChartRecoveryRate.latestDays = event.value;
		this.prepareCovidRecoveryChartRecoveryCountryProgress(this.covidRecoveryChartRecoveryRate.selectedCountry, this.covidRecoveryChartRecoveryRate.latestDays);
		this.prepareCovidDeathChartInfectedDeathRecoveryCountryProgress(this.covidRecoveryChartRecoveryRate.selectedCountry, this.covidRecoveryChartRecoveryRate.latestDays);
	}

	public getCovidRecoveryPercentByCountry(countryName: string): number {

		let countryInfected: number = this.workhorse.getCovidInfectedByCountry(this.coviddataService.getConfirmedCovidData(), countryName);

		return this.workhorse.getCovidRecoveryPercentByCountry(this.covidRecoveryData, countryName, countryInfected);
	}

	public getCovidRecoveryPercent(): number {

		let covidConfirmedData: CovidData = this.coviddataService.getConfirmedCovidData();
		let totalConfirmed: number = this.workhorse.getCovidTotalInfected(covidConfirmedData);
		let totalRecovered: number = this.workhorse.getCovidTotalRecovered(this.covidRecoveryData);

		return this.workhorse.percentage(totalRecovered, totalConfirmed, 2);
	}

	private covidRecoveryCallback = function() {

		this.isLoading = false;
		this.latestCovidRecoveryDate = this.workhorse.getLatestCovidDatasetDate(this.covidRecoveryData);

		this.prepareCovidRecoveryTableData()
		this.prepareCovidRecoveryChartRecoveryRatio();
		this.prepareCovidRecoveryChartRecoveryCountryProgress(this.covidRecoveryChartRecoveryRate.selectedCountry, this.covidRecoveryChartRecoveryRate.latestDays);
		this.prepareCovidDeathChartInfectedDeathRecoveryCountryProgress(this.covidRecoveryChartRecoveryRate.selectedCountry, this.covidRecoveryChartRecoveryRate.latestDays);
	}.bind(this);

	private prepareCovidRecoveryChartRecoveryRatio(): void {

		let totalConfirmed: number = this.workhorse.getCovidTotalInfected(this.coviddataService.getConfirmedCovidData());
		let totalDeaths: number = this.workhorse.getCovidTotalDeaths(this.coviddataService.getDeathCovidData());

		if((totalConfirmed < 1) || (totalDeaths < 1))
			setTimeout(() => {
				this.prepareCovidRecoveryChartRecoveryRatio();
			}, 500);
		else this.covidRecoveryChartRecoveryRatio.single = [{
			"name": "Infected",
			"value": totalConfirmed
		}, {
			"name": "Deaths",
			"value": totalDeaths
		}, {
			"name": "Recovered",
			"value": this.workhorse.getCovidTotalRecovered(this.covidRecoveryData)
		}];
	}

	private prepareCovidRecoveryChartRecoveryCountryProgress(countryName: string, latestDays: number): void {

		let newValues: any[] = new Array();
		let country: Country;

		if(this.covidRecoveryData.getCountries()) {
			if(this.covidRecoveryData.hasCountryByName(countryName)) {

				country = this.covidRecoveryData.getCountryByName(countryName);

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
			
				this.covidRecoveryChartRecoveryRate.multi = newValues;
			}
		}
	}

	private prepareCovidDeathChartInfectedDeathRecoveryCountryProgress(countryName: string, latestDays: number): void {
		this.covidDeathChartInfectionToDeathToRecoveryRate.multiComparison = [{
			"name": "Infection",
			"series": this.workhorse.getCountryTotalInfectionProgress(this.coviddataService.getConfirmedCovidData(), countryName, latestDays)
		}, {
			"name": "Death",
			"series": this.workhorse.getCountryTotalDeathProgress(this.coviddataService.getDeathCovidData(), countryName, latestDays)
		}, {
			"name": "Recovery",
			"series": this.workhorse.getCountryTotalRecoveryProgress(this.covidRecoveryData, countryName, latestDays)
		}];
	}

	private prepareCovidRecoveryTableData(): void {

		this.covidRecoveryTableDisplayedColumns = this.workhorse.getDatatableFriendlyCovidTimeseriesHeaders(this.covidRecoveryData.getHeaders());
		this.COVID_RECOVERY_MAT_TABLE_DATASCOURCE = new MatTableDataSource<any[]>(this.workhorse.getDatatableFriendlyCovidTimeseriesData(this.covidRecoveryData));

		this.COVID_RECOVERY_MAT_TABLE_DATASCOURCE.paginator = this.paginator;
	}
}
