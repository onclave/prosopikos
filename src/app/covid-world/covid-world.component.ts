import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CoviddataService } from '../coviddata.service';
import { CovidMapService } from '../covid-map.service';
import { WorkhorseService } from '../workhorse.service';
import { CovidData } from '../model/covidData';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatRadioChange } from '@angular/material/radio';
import { Country } from '../model/country';
import { MatSliderChange } from '@angular/material/slider';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CovidDatasetViewerService } from '../covid-dataset-viewer.service';
import { CovidAnalysisService } from '../covid-analysis.service';

@Component({
	selector: 'app-covid-world',
	templateUrl: './covid-world.component.html',
	styleUrls: ['./covid-world.component.css', '../covid/covid.component.css']
})
export class CovidWorldComponent implements OnInit {

	private xs: string = '(max-width: 599px)';
	private smMin: string = '(min-width: 600px)';
	private smMax: string = '(max-width: 959px)';
	private mdMin: string = '(min-width: 960px)';
	private mdMax: string = '(max-width: 1279px)';
	private lgMin: string = '(min-width: 1280px)';

	private lineChartToggleFalse: string = 'all affected countries';
	private lineChartToggleTrue: string = 'the world';

	private breakpointObserver: BreakpointObserver;
	private coviddataService: CoviddataService;
	private covidMapService: CovidMapService;
	private covidDatasetViewerService: CovidDatasetViewerService;
	private covidAnalysisService: CovidAnalysisService;

	public workhorse: WorkhorseService;
	public covidConfirmedData: CovidData = new CovidData();
	public covidDeathData: CovidData = new CovidData();
	public covidRecoveryData: CovidData = new CovidData();

	public isConfirmedLoading: boolean = true;
	public isRecoveredLoading: boolean = true;
	public isDeathLoading: boolean = true;
	public latestCovidConfirmedDate: string = '-';
	public latestCovidRecoveryDate: string = '-';
	public latestCovidDeathDate: string = '-';

	public covidWorldCountriesBarGraph = {
		multi: [],
		view: [500, 500],
		showXAxis: true,
		showYAxis: true,
		gradient: false,
		showLegend: true,
		legendPosition: 'right',
		showXAxisLabel: false,
		showYAxisLabel: false,
		xAxisLabel: "Regions",
		yAxisLabel: "Total Infection",
		colorScheme: {
			domain: [ '#F55F96', '#F2ABC7', '#D70518' ]
		},
		selectedCountriesCount: 10,
		viewInfected: true,
		viewRecovered: true,
		viewDeceased: true
	};

	public covidWorldProgressLineChart = {
		multi: [],
		view: [500, 500],
		showXAxis: true,
		showYAxis: true,
		showLegend: true,
		legendPosition: 'right',
		showXAxisLabel: false,
		showYAxisLabel: false,
		xAxisLabel: "Days",
		yAxisLabel: "Affected",
		colorScheme: {
			domain: [ '#F55F96', '#F2ABC7', '#D70518', '#F2069F', '#F86660', '#BF110C', '#FF1610', '#DE8903', '#E84703' ]
		},
		latestDays: 14,
		showAllCountries: false,
		allCountriesToggleMessage: this.lineChartToggleFalse,
		countrywisePlotSelection: '1'
	};

	public covidWorldCountryProgressLineChart = {
		multi: [],
		view: [500, 500],
		showXAxis: true,
		showYAxis: true,
		showLegend: true,
		legendPosition: 'right',
		showXAxisLabel: false,
		showYAxisLabel: false,
		xAxisLabel: "Days",
		yAxisLabel: "Affected",
		colorScheme: {
			domain: [ '#F55F96', '#F2ABC7', '#D70518' ]
		},
		selectedCountry: '',
		latestDays: 14
	};

	constructor(coviddataService: CoviddataService, workhorse: WorkhorseService, covidMapService: CovidMapService, covidDatasetViewerService: CovidDatasetViewerService, covidAnalysisService: CovidAnalysisService, breakpointObserver: BreakpointObserver) {

		this.coviddataService = coviddataService;
		this.workhorse = workhorse;
		this.covidMapService = covidMapService;
		this.covidDatasetViewerService = covidDatasetViewerService;
		this.covidAnalysisService = covidAnalysisService;
		this.breakpointObserver = breakpointObserver;
	}

	ngOnInit(): void {

		this.coviddataService.init(this.covidWorldConfirmedCallback, 7);
		this.coviddataService.init(this.covidWorldRecoveryCallback, 8);
		this.coviddataService.init(this.covidWorldDeathCallback, 9);

		this.covidConfirmedData = this.coviddataService.getWorldConfirmedCovidData();
		this.covidRecoveryData = this.coviddataService.getWorldRecoveryCovidData();
		this.covidDeathData = this.coviddataService.getWorldDeathCovidData();

		this.breakpointObserver.observe([this.xs]).subscribe((state: BreakpointState) => {
			if(state.matches) {
				
				let width: number = window.innerWidth - 20;

				this.covidWorldCountriesBarGraph.view = [width, 250];
				this.covidWorldProgressLineChart.view = [width, 250];
				this.covidWorldCountryProgressLineChart.view = [width, 250];
				this.covidWorldCountriesBarGraph.legendPosition = 'below';
				this.covidWorldProgressLineChart.legendPosition = 'below';
				this.covidWorldCountryProgressLineChart.legendPosition = 'below';
			}
		});

		this.breakpointObserver.observe([this.smMin, this.smMax]).subscribe((state: BreakpointState) => {

			if(state[this.smMin] && state[this.smMax]) {
				
				let width: number = window.innerWidth - 20;

				this.covidWorldCountriesBarGraph.view = [width, 350];
				this.covidWorldProgressLineChart.view = [width, 350];
				this.covidWorldCountryProgressLineChart.view = [width, 350];
				this.covidWorldCountriesBarGraph.legendPosition = 'below';
				this.covidWorldProgressLineChart.legendPosition = 'below';
				this.covidWorldCountryProgressLineChart.legendPosition = 'below';
			}
		});

		this.breakpointObserver.observe([this.mdMin, this.mdMax]).subscribe((state: BreakpointState) => {

			if(state[this.mdMin] && state[this.mdMax]) {
				
				let width: number = window.innerWidth - 50;

				this.covidWorldCountriesBarGraph.view = [width, 400];
				this.covidWorldProgressLineChart.view = [width, 400];
				this.covidWorldCountryProgressLineChart.view = [width, 400];
				this.covidWorldCountriesBarGraph.legendPosition = 'right';
				this.covidWorldProgressLineChart.legendPosition = 'right';
				this.covidWorldCountryProgressLineChart.legendPosition = 'right';
			}
		});

		this.breakpointObserver.observe([this.lgMin]).subscribe((state: BreakpointState) => {
			if(state.matches) {
				
				this.covidWorldCountriesBarGraph.view = [1100, 500];
				this.covidWorldProgressLineChart.view = [1100, 500];
				this.covidWorldCountryProgressLineChart.view = [1100, 500];
				this.covidWorldCountriesBarGraph.legendPosition = 'right';
				this.covidWorldProgressLineChart.legendPosition = 'right';
				this.covidWorldCountryProgressLineChart.legendPosition = 'right';
			}
		});
	}

	public onSelectCovidWorldProgressLineChart(event): void {}
	public onSelectCovidWorldCountriesBarGraph(event): void {}
	public onSelectCovidWorldCountryProgressLineChart(event): void {}

	public onSelectorChangeCovidWorldProgressLineChartLatestDays(event: MatSelectChange): void {

		this.covidWorldProgressLineChart.latestDays = event.value;

		if(this.covidWorldProgressLineChart.showAllCountries) this.prepareCovidWorldCountryComparisonLineChart();
		else this.prepareCovidWorldProgressLineChart();
	}

	public onChangeShowCountrywiseInfectionToggle(event: MatSlideToggleChange): void {

		this.covidWorldProgressLineChart.showAllCountries = event.checked;

		if(event.checked) {

			this.covidWorldProgressLineChart.allCountriesToggleMessage = this.lineChartToggleTrue;
			this.prepareCovidWorldCountryComparisonLineChart();
		} else {

			this.covidWorldProgressLineChart.allCountriesToggleMessage = this.lineChartToggleFalse;
			this.prepareCovidWorldProgressLineChart();
		}
	}

	public onChangeSelectCountrywiseLineChartToShow(event: MatRadioChange): void {

		this.covidWorldProgressLineChart.countrywisePlotSelection = event.value;
		this.prepareCovidWorldCountryComparisonLineChart();
	}

	public onSliderChangeCovidWorldCountriesBarGraph(event: MatSliderChange): void {

		this.covidWorldCountriesBarGraph.selectedCountriesCount = event.value;
		this.prepareCovidWorldCountriesBarGraph();
	}

	public onCheckboxSelectionChangeCovidWorldCountriesBarGraphDataStack(event: MatCheckboxChange): void {
		this.prepareCovidWorldCountriesBarGraph();
	}

	public onSelectorChangeCovidWorldCountryProgressLineChartSelectedState(event: MatSelectChange): void {

		this.covidWorldCountryProgressLineChart.selectedCountry = event.value;
		this.prepareCovidWorldCountryProgressLineChart();
	}

	public onSelectorChangeCovidWorldCountryProgressLineChartLatestDays(event: MatSelectChange): void {

		this.covidWorldCountryProgressLineChart.latestDays = event.value;
		this.prepareCovidWorldCountryProgressLineChart();
	}

	public getMaxCountryCountAvailableInAllDatasets(): number {

		let confirmedCountries: number = this.covidConfirmedData.getCountries().length;
		let recoveredCountries: number = this.covidRecoveryData.getCountries().length;
		let deathCountries: number = this.covidDeathData.getCountries().length;

		return ((confirmedCountries < recoveredCountries) ? ((confirmedCountries < deathCountries) ? confirmedCountries : deathCountries) : ((recoveredCountries < deathCountries) ? recoveredCountries : deathCountries));
	}

	public getCovidHighestCountryAffected(covidData: CovidData, capitalizeFirstLetter: boolean = false): string {

		let affectedCountry: string = "-";
		let maxCount: number = 0;

		if(covidData && covidData.getCountries()) for(let country of covidData.getCountries()) {

			let totalCount: number = 0;

			for(let province of country.getProvinces()) {
				totalCount += province.getLastTimeseries().getValue();
			}

			if(maxCount < totalCount) {

				maxCount = totalCount;
				affectedCountry = country.getName();
			}
		}

		if(capitalizeFirstLetter) affectedCountry = this.workhorse.capitalizeFirstLetter(affectedCountry);

		return affectedCountry;
	}

	public getCovidHighestCountryAffectedCount(covidData: CovidData): number {

		let maxAffected: number = 0;

		if(covidData && covidData.getCountries()) for(let country of covidData.getCountries()) {

			let totalCount: number = 0;

			for(let province of country.getProvinces()) totalCount += province.getLastTimeseries().getValue();

			if(maxAffected < totalCount) maxAffected = totalCount;
		}

		return maxAffected;
	}

	public getTotalNumberOfCountriesInfected(): number {

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

	private covidWorldConfirmedCallback = function() {

		this.isConfirmedLoading = false;
		this.latestCovidConfirmedDate = this.workhorse.getLatestCovidDatasetDate(this.covidConfirmedData);

		this.covidWorldCountryProgressLineChart.selectedCountry = this.getCovidHighestCountryAffected(this.covidConfirmedData);
		this.covidMapService.initWorldMapMarker(this.covidMapService.getMapObject(), this.coviddataService, false);
		this.prepareCovidWorldProgressLineChart();
		this.prepareCovidWorldCountriesBarGraph(this.covidWorldCountriesBarGraph.selectedCountriesCount);
		this.prepareCovidWorldCountryProgressLineChart();
		this.covidDatasetViewerService.prepareCovidWorldConfirmedDatatable();
		this.covidAnalysisService.prepareCovidAnalysisTemperatureToInfectionLineGraph(this.workhorse.selectNRandomProvinces(this.covidConfirmedData, this.covidAnalysisService.getCovidAnalysisTemperatureToInfectionLineGraph().totalSelection, this.getTotalNumberOfCountriesInfected()));
		this.covidAnalysisService.prepareCovidAnalysisTemperatureToInfectionSelectedLineGraph(this.workhorse.selectAllProvinces(this.covidConfirmedData), this.covidAnalysisService.getCovidAnalysisTemperatureToInfectionSelectedLineGraph().chunks, this.covidAnalysisService.getCovidAnalysisTemperatureToInfectionSelectedLineGraph().latestDays);
	}.bind(this);

	private covidWorldRecoveryCallback = function() {

		this.isRecoveredLoading = false;
		this.latestCovidRecoveryDate = this.workhorse.getLatestCovidDatasetDate(this.covidRecoveryData);

		this.covidMapService.initWorldMapMarker(this.covidMapService.getMapObject(), this.coviddataService, false);
		this.prepareCovidWorldProgressLineChart();
		this.prepareCovidWorldCountriesBarGraph(this.covidWorldCountriesBarGraph.selectedCountriesCount);
		this.prepareCovidWorldCountryProgressLineChart();
		this.covidDatasetViewerService.prepareCovidWorldRecoveryDatatable();
	}.bind(this);

	private covidWorldDeathCallback = function() {

		this.isDeathLoading = false;
		this.latestCovidDeathDate = this.workhorse.getLatestCovidDatasetDate(this.covidDeathData);

		this.covidMapService.initWorldMapMarker(this.covidMapService.getMapObject(), this.coviddataService, false);
		this.prepareCovidWorldProgressLineChart();
		this.prepareCovidWorldCountriesBarGraph(this.covidWorldCountriesBarGraph.selectedCountriesCount);
		this.prepareCovidWorldCountryProgressLineChart();
		this.covidDatasetViewerService.prepareCovidWorldDeathDatatable();
	}.bind(this);

	private prepareCovidWorldCountryComparisonLineChart(): void {

		let newValues: any[] = new Array();

		switch(this.covidWorldProgressLineChart.countrywisePlotSelection) {

			case '1':

				if(this.covidConfirmedData && this.covidConfirmedData.getCountries() && (this.covidConfirmedData.getCountries().length > 0))
					for(let country of this.covidConfirmedData.getCountries()) newValues.push({
						"name": country.getName(),
						"series": this.workhorse.getCountryTotalInfectionProgress(this.covidConfirmedData, country.getName(), this.covidWorldProgressLineChart.latestDays)
					}); break;

			case '2':

				if(this.covidRecoveryData && this.covidRecoveryData.getCountries() && (this.covidRecoveryData.getCountries().length > 0))
					for(let country of this.covidRecoveryData.getCountries()) newValues.push({
						"name": country.getName(),
						"series": this.workhorse.getCountryTotalRecoveryProgress(this.covidRecoveryData, country.getName(), this.covidWorldProgressLineChart.latestDays)
					}); break;

			case '3':

				if(this.covidDeathData && this.covidDeathData.getCountries() && (this.covidDeathData.getCountries().length > 0))
					for(let country of this.covidDeathData.getCountries()) newValues.push({
						"name": country.getName(),
						"series": this.workhorse.getCountryTotalDeathProgress(this.covidDeathData, country.getName(), this.covidWorldProgressLineChart.latestDays)
					}); break;
		}

		this.covidWorldProgressLineChart.multi = newValues;
	}

	private prepareCovidWorldCountriesBarGraph(): void {

		let newValues: any[] = new Array();
		let topSelected: any[] = new Array();

		if(this.isDatasetReady()) {

			for(let country of this.covidConfirmedData.getCountries()) if(this.covidRecoveryData.getCountryByName(country.getName()) && this.covidDeathData.getCountryByName(country.getName())) {

				let series: any[] = new Array();

				if(this.covidWorldCountriesBarGraph.viewInfected) series.push({
					"name": "Infected",
					"value": this.workhorse.getCovidAffectedByCountry(this.covidConfirmedData, country.getName())
				});

				if(this.covidWorldCountriesBarGraph.viewRecovered) series.push({
					"name": "Recovered",
					"value": this.workhorse.getCovidAffectedByCountry(this.covidRecoveryData, country.getName())
				});

				if(this.covidWorldCountriesBarGraph.viewDeceased) series.push({
					"name": "Deceased",
					"value": this.workhorse.getCovidAffectedByCountry(this.covidDeathData, country.getName())
				});

				newValues.push({
					"name": country.getName(),
					"series": series
				});
			}

			newValues.sort((a, b) => {
			
				let totalValuesA: number = 0;
				let totalValuesB: number = 0;
	
				for(let item of a.series) totalValuesA += item.value;
				for(let item of b.series) totalValuesB += item.value;
	
				return totalValuesB - totalValuesA;
			});
	
			for(let i: number = 0; i < this.covidWorldCountriesBarGraph.selectedCountriesCount; i++) topSelected.push(newValues[i]);
	
			this.covidWorldCountriesBarGraph.multi = topSelected;
		}
	}

	private prepareCovidWorldProgressLineChart(): void {
		if(this.covidConfirmedData && this.covidRecoveryData && this.covidDeathData && this.covidConfirmedData.getCountries() && this.covidRecoveryData.getCountries() && this.covidDeathData.getCountries())
			this.covidWorldProgressLineChart.multi = [{
				"name": "Infection",
				"series": this.workhorse.getWorldAffectedProgress(this.covidConfirmedData, this.covidWorldProgressLineChart.latestDays)
			}, {
				"name": "Recovery",
				"series": this.workhorse.getWorldAffectedProgress(this.covidRecoveryData, this.covidWorldProgressLineChart.latestDays)
			}, {
				"name": "Deceased",
				"series": this.workhorse.getWorldAffectedProgress(this.covidDeathData, this.covidWorldProgressLineChart.latestDays)
			}];
	}

	private prepareCovidWorldCountryProgressLineChart(): void {
		if(this.isDatasetReady()) this.covidWorldCountryProgressLineChart.multi = [{
			"name": "Infection",
			"series": this.workhorse.getCountryTotalAffectedProgress(this.covidConfirmedData, this.covidWorldCountryProgressLineChart.selectedCountry, this.covidWorldCountryProgressLineChart.latestDays)
		}, {
			"name": "Recovery",
			"series": this.workhorse.getCountryTotalAffectedProgress(this.covidRecoveryData, this.covidWorldCountryProgressLineChart.selectedCountry, this.covidWorldCountryProgressLineChart.latestDays)
		}, {
			"name": "Deceased",
			"series": this.workhorse.getCountryTotalAffectedProgress(this.covidDeathData, this.covidWorldCountryProgressLineChart.selectedCountry, this.covidWorldCountryProgressLineChart.latestDays)
		}];
	}

	private isDatasetReady(): boolean {
		return (this.covidConfirmedData && this.covidRecoveryData && this.covidDeathData && this.covidConfirmedData.getCountries() && this.covidRecoveryData.getCountries() && this.covidDeathData.getCountries() && (this.covidConfirmedData.getCountries().length > 0) && (this.covidRecoveryData.getCountries().length > 0) && (this.covidDeathData.getCountries().length > 0));
	}
}
