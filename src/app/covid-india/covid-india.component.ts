import { Component, OnInit, ViewChild } from '@angular/core';
import { CovidData } from '../model/covidData';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { CoviddataService } from '../coviddata.service';
import { WorkhorseService } from '../workhorse.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSliderChange } from '@angular/material/slider';
import { Country } from '../model/country';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatRadioChange } from '@angular/material/radio';
import { CovidMapService } from '../covid-map.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CovidDatasetViewerService } from '../covid-dataset-viewer.service';
import { Timeseries } from '../model/timeseries';

@Component({
	selector: 'app-covid-india',
	templateUrl: './covid-india.component.html',
	styleUrls: ['./covid-india.component.css', '../covid/covid.component.css']
})
export class CovidIndiaComponent implements OnInit {

	private xs: string = '(max-width: 599px)';
	private smMin: string = '(min-width: 600px)';
	private smMax: string = '(max-width: 959px)';
	private mdMin: string = '(min-width: 960px)';
	private mdMax: string = '(max-width: 1279px)';
	private lgMin: string = '(min-width: 1280px)';

	private lineChartToggleFalse: string = 'all states of India';
	private lineChartToggleTrue: string = 'India as a country';

	private breakpointObserver: BreakpointObserver;
	private coviddataService: CoviddataService;
	private covidMapService: CovidMapService;
	private covidDatasetViewerService: CovidDatasetViewerService;

	public workhorse: WorkhorseService;
	public covidConfirmedData: CovidData = new CovidData();
	public covidDeathData: CovidData = new CovidData();
	public covidRecoveryData: CovidData = new CovidData();

	public isConfirmedLoading: boolean = true;
	public isRecoveredLoading: boolean = true;
	public isDeathLoading: boolean = true;
	public latestCovidConfirmedDate: string = '-';

	public covidIndiaRegionsBarGraph = {
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
			domain: [ '#F86660', '#BF110C', '#FF1610' ]
		},
		selectedRegionCount: 10,
		viewInfected: true,
		viewRecovered: true,
		viewDeceased: true
	};

	public covidIndiaProgressLineChart = {
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
		showAllStates: false,
		allStatesToggleMessage: this.lineChartToggleFalse,
		statewisePlotSelection: '1'
	};

	public covidIndiaStateProgressLineChart = {
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
		selectedState: '',
		latestDays: 14
	};

	constructor(coviddataService: CoviddataService, workhorse: WorkhorseService, covidMapService: CovidMapService, covidDatasetViewerService: CovidDatasetViewerService, breakpointObserver: BreakpointObserver) {

		this.coviddataService = coviddataService;
		this.workhorse = workhorse;
		this.covidMapService = covidMapService;
		this.covidDatasetViewerService = covidDatasetViewerService;
		this.breakpointObserver = breakpointObserver;
	}

	ngOnInit(): void {

		this.coviddataService.init(this.covidConfirmedCallback, 1);
		this.coviddataService.init(this.covidRecoveryCallback, 2);
		this.coviddataService.init(this.covidDeathCallback, 3);

		this.covidConfirmedData = this.coviddataService.getIndiaConfirmedCovidData();
		this.covidRecoveryData = this.coviddataService.getIndiaRecoveryCovidData();
		this.covidDeathData = this.coviddataService.getIndiaDeathCovidData();

		this.breakpointObserver.observe([this.xs]).subscribe((state: BreakpointState) => {
			if(state.matches) {
				
				let width: number = window.innerWidth - 20;

				this.covidIndiaRegionsBarGraph.view = [width, 250];
				this.covidIndiaProgressLineChart.view = [width, 250];
				this.covidIndiaStateProgressLineChart.view = [width, 250];
				this.covidIndiaRegionsBarGraph.legendPosition = 'below';
				this.covidIndiaProgressLineChart.legendPosition = 'below';
				this.covidIndiaStateProgressLineChart.legendPosition = 'below';
			}
		});

		this.breakpointObserver.observe([this.smMin, this.smMax]).subscribe((state: BreakpointState) => {

			if(state[this.smMin] && state[this.smMax]) {
				
				let width: number = window.innerWidth - 20;

				this.covidIndiaRegionsBarGraph.view = [width, 350];
				this.covidIndiaProgressLineChart.view = [width, 350];
				this.covidIndiaStateProgressLineChart.view = [width, 350];
				this.covidIndiaRegionsBarGraph.legendPosition = 'below';
				this.covidIndiaProgressLineChart.legendPosition = 'below';
				this.covidIndiaStateProgressLineChart.legendPosition = 'below';
			}
		});

		this.breakpointObserver.observe([this.mdMin, this.mdMax]).subscribe((state: BreakpointState) => {

			if(state[this.mdMin] && state[this.mdMax]) {
				
				let width: number = window.innerWidth - 50;

				this.covidIndiaRegionsBarGraph.view = [width, 350];
				this.covidIndiaProgressLineChart.view = [width, 350];
				this.covidIndiaStateProgressLineChart.view = [width, 350];
				this.covidIndiaRegionsBarGraph.legendPosition = 'right';
				this.covidIndiaProgressLineChart.legendPosition = 'right';
				this.covidIndiaStateProgressLineChart.legendPosition = 'right';
			}
		});

		this.breakpointObserver.observe([this.lgMin]).subscribe((state: BreakpointState) => {
			if(state.matches) {
				
				this.covidIndiaRegionsBarGraph.view = [1100, 450];
				this.covidIndiaProgressLineChart.view = [1100, 450];
				this.covidIndiaStateProgressLineChart.view = [1100, 450];
				this.covidIndiaRegionsBarGraph.legendPosition = 'right';
				this.covidIndiaProgressLineChart.legendPosition = 'right';
				this.covidIndiaStateProgressLineChart.legendPosition = 'right';
			}
		});
	}

	public onSelectCovidIndiaRegionsBarGraph(event): void {}
	public onSelectCovidIndiaProgressLineChart(event): void {}
	public onSelectCovidIndiaStateProgressLineChart(event): void {}

	public onChangeShowStatewiseInfectionToggle(event: MatSlideToggleChange): void {

		this.covidIndiaProgressLineChart.showAllStates = event.checked;

		if(event.checked) {

			this.covidIndiaProgressLineChart.allStatesToggleMessage = this.lineChartToggleTrue;
			this.prepareCovidIndiaRegionComparisonLineChart();
		} else {

			this.covidIndiaProgressLineChart.allStatesToggleMessage = this.lineChartToggleFalse;
			this.prepareCovidIndiaProgressLineChart();
		}

		this.setCovidIndiaProgressLineChartYAxislabel();
	}

	public onChangeSelectStatewiseLineChartToShow(event: MatRadioChange): void {

		this.covidIndiaProgressLineChart.statewisePlotSelection = event.value;
		this.prepareCovidIndiaRegionComparisonLineChart();
		this.setCovidIndiaProgressLineChartYAxislabel();
	}

	public getConvidConfirmedTotalNumberOfStatesInfected(): number {

		let totalCount: number = 0;

		if(this.covidConfirmedData && this.covidConfirmedData.getCountries() && (this.covidConfirmedData.getCountries().length == 1))
			totalCount = this.covidConfirmedData.getCountries()[0].getProvinces().length;

		return totalCount;
	}

	public onSliderChangeCovidIndiaRegionsBarGraph(event: MatSliderChange): void {

		this.covidIndiaRegionsBarGraph.selectedRegionCount = event.value;
		this.prepareCovidIndiaRegionsBarGraph();
	}

	public onSelectorChangeCovidIndiaProgressLineChartLatestDays(event: MatSelectChange): void {

		this.covidIndiaProgressLineChart.latestDays = event.value;

		if(this.covidIndiaProgressLineChart.showAllStates) this.prepareCovidIndiaRegionComparisonLineChart();
		else this.prepareCovidIndiaProgressLineChart();
	}

	public onSelectorChangeCovidIndiaStateProgressLineChartSelectedState(event: MatSelectChange): void {

		this.covidIndiaStateProgressLineChart.selectedState = event.value;
		this.prepareCovidIndiaRegionProgressLineChart();
	}

	public onSelectorChangeCovidIndiaStateProgressLineChartLatestDays(event: MatSelectChange): void {

		this.covidIndiaStateProgressLineChart.latestDays = event.value;
		this.prepareCovidIndiaRegionProgressLineChart();
	}

	public onCheckboxSelectionChangeCovidIndiaRegionsBarGraphDataStack(event: MatCheckboxChange): void {
		this.prepareCovidIndiaRegionsBarGraph();
	}

	public getCovidIndiaConfirmedHighestRegionInfected(capitalizeFirstLetter: boolean = false): string {

		let infectedRegion: string = "-";
		let maxInfection: number = 0;

		if(this.covidConfirmedData && this.covidConfirmedData.getCountries() && (this.covidConfirmedData.getCountries().length == 1))
			for(let province of this.covidConfirmedData.getCountries()[0].getProvinces())
				if(maxInfection < province.getLastTimeseries().getValue()) {
					maxInfection = province.getLastTimeseries().getValue();
					infectedRegion = province.getName();
				}

		if(capitalizeFirstLetter) infectedRegion = this.workhorse.capitalizeFirstLetter(infectedRegion);

		return infectedRegion;
	}

	public getCovidIndiaConfirmedHighestRegionRecovery(capitalizeFirstLetter: boolean = false): string {

		let recoveryRegion: string = "-";
		let maxRecovery: number = 0;

		if(this.covidRecoveryData && this.covidRecoveryData.getCountries() && (this.covidRecoveryData.getCountries().length == 1))
			for(let province of this.covidRecoveryData.getCountries()[0].getProvinces())
				if(maxRecovery < province.getLastTimeseries().getValue()) {
					maxRecovery = province.getLastTimeseries().getValue();
					recoveryRegion = province.getName();
				}

		if(capitalizeFirstLetter) recoveryRegion = this.workhorse.capitalizeFirstLetter(recoveryRegion);

		return recoveryRegion;
	}

	public getCovidIndiaConfirmedHighestRegionDeaths(capitalizeFirstLetter: boolean = false): string {

		let deathRegion: string = "-";
		let maxDeaths: number = 0;

		if(this.covidDeathData && this.covidDeathData.getCountries() && (this.covidDeathData.getCountries().length == 1))
			for(let province of this.covidDeathData.getCountries()[0].getProvinces())
				if(maxDeaths < province.getLastTimeseries().getValue()) {
					maxDeaths = province.getLastTimeseries().getValue();
					deathRegion = province.getName();
				}

		if(capitalizeFirstLetter) deathRegion = this.workhorse.capitalizeFirstLetter(deathRegion);

		return deathRegion;
	}

	public getCovidIndiaConfirmedHighestRegionInfectionCount(): number {
		
		let maxInfection: number = 0;

		if(this.covidConfirmedData && this.covidConfirmedData.getCountries() && (this.covidConfirmedData.getCountries().length == 1))
			for(let province of this.covidConfirmedData.getCountries()[0].getProvinces())
				if(maxInfection < province.getLastTimeseries().getValue())
					maxInfection = province.getLastTimeseries().getValue();

		return maxInfection;
	}

	public getCovidIndiaConfirmedHighestRegionRecoveryCount(): number {
		
		let maxRecovery: number = 0;

		if(this.covidRecoveryData && this.covidRecoveryData.getCountries() && (this.covidRecoveryData.getCountries().length == 1))
			for(let province of this.covidRecoveryData.getCountries()[0].getProvinces())
				if(maxRecovery < province.getLastTimeseries().getValue())
					maxRecovery = province.getLastTimeseries().getValue();

		return maxRecovery;
	}

	public getCovidIndiaConfirmedHighestRegionDeathCount(): number {
		
		let maxDeaths: number = 0;

		if(this.covidDeathData && this.covidDeathData.getCountries() && (this.covidDeathData.getCountries().length == 1))
			for(let province of this.covidDeathData.getCountries()[0].getProvinces())
				if(maxDeaths < province.getLastTimeseries().getValue())
					maxDeaths = province.getLastTimeseries().getValue();

		return maxDeaths;
	}




	public getCovidIndiaAffectedIncrease(covidData: CovidData): number {

		let previous: number = 0;
		let current: number = 0;

		if (covidData && covidData.getCountries() && (covidData.getCountries().length == 1))
			for (let province of covidData.getCountries()[0].getProvinces()) {

				let timeseries: Timeseries[] = province.getLatestNTimeseries(2);
				previous += timeseries[0].getValue();
				current += timeseries[1].getValue();
			}

		return current - previous;
	}














	public getCovidIndiaConfirmedHighestRegionInfectedPopulation(): number {

		let population: number = 0;
		let maxInfection: number = 0;

		if(this.covidConfirmedData && this.covidConfirmedData.getCountries() && (this.covidConfirmedData.getCountries().length == 1))
			for(let province of this.covidConfirmedData.getCountries()[0].getProvinces())
				if(maxInfection < province.getLastTimeseries().getValue()) {
					maxInfection = province.getLastTimeseries().getValue();
					population = province.getPopulation();
				}

		return population;
	}

	public getConvidConfirmedIndiaMaxSpike(): number {

		let india: Country;
		let spike: number = 0;
		let timeseriesLength: number = 0;

		if(this.covidConfirmedData && this.covidConfirmedData.getCountries() && (this.covidConfirmedData.getCountries().length == 1)) {

			india = this.covidConfirmedData.getCountries()[0];
			timeseriesLength = india.getProvinces()[0].getTimeseries().length;

			for(let i: number = 1; i < timeseriesLength; i++) {

				let previousInfectionCount: number = 0;
				let newInfectionCount: number = 0;

				for(let province of india.getProvinces()) {

					previousInfectionCount += province.getTimeseries()[i - 1].getValue();
					newInfectionCount += province.getTimeseries()[i].getValue();
				}

				let singleSpike = newInfectionCount - previousInfectionCount;

				if(spike < singleSpike) spike = singleSpike;
			}
		}

		return spike;
	}

	public getConvidConfirmedIndiaMaxSpikeDay(): string {

		let india: Country;
		let spike: number = 0;
		let spikeDay: string = "-";
		let timeseriesLength: number = 0;

		if(this.covidConfirmedData && this.covidConfirmedData.getCountries() && (this.covidConfirmedData.getCountries().length == 1)) {

			india = this.covidConfirmedData.getCountries()[0];
			timeseriesLength = india.getProvinces()[0].getTimeseries().length;

			for(let i: number = 1; i < timeseriesLength; i++) {

				let previousInfectionCount: number = 0;
				let newInfectionCount: number = 0;

				for(let province of india.getProvinces()) {

					previousInfectionCount += province.getTimeseries()[i - 1].getValue();
					newInfectionCount += province.getTimeseries()[i].getValue();
				}

				let singleSpike = newInfectionCount - previousInfectionCount;

				if(spike < singleSpike) {

					spike = singleSpike;
					spikeDay = india.getProvinces()[0].getTimeseries()[i - 1].getDate() + " to " + india.getProvinces()[0].getTimeseries()[i].getDate();
				}
			}
		}

		return spikeDay;
	}

	private covidConfirmedCallback = function() {

		this.isConfirmedLoading = false;
		this.latestCovidConfirmedDate = this.workhorse.getLatestCovidDatasetDate(this.covidConfirmedData);
		this.covidIndiaStateProgressLineChart.selectedState = this.getCovidIndiaConfirmedHighestRegionInfected();

		this.covidMapService.initIndiaMapMarker(this.covidMapService.getMapObject(), this.coviddataService, false);
		this.prepareCovidIndiaProgressLineChart();
		this.prepareCovidIndiaRegionsBarGraph();
		this.prepareCovidIndiaRegionProgressLineChart();
		this.covidDatasetViewerService.prepareCovidIndiaConfirmedDatatable();
	}.bind(this);

	private covidRecoveryCallback = function() {

		this.isRecoveredLoading = false;
		
		this.covidMapService.initIndiaMapMarker(this.covidMapService.getMapObject(), this.coviddataService, false);
		this.prepareCovidIndiaProgressLineChart();
		this.prepareCovidIndiaRegionsBarGraph();
		this.prepareCovidIndiaRegionProgressLineChart();
		this.covidDatasetViewerService.prepareCovidIndiaRecoveryDatatable();
	}.bind(this);

	private covidDeathCallback = function() {

		this.isDeathLoading = false;

		this.covidMapService.initIndiaMapMarker(this.covidMapService.getMapObject(), this.coviddataService, false);
		this.prepareCovidIndiaProgressLineChart();
		this.prepareCovidIndiaRegionsBarGraph();
		this.prepareCovidIndiaRegionProgressLineChart();
		this.covidDatasetViewerService.prepareCovidIndiaDeathDatatable();
	}.bind(this);

	private prepareCovidIndiaRegionsBarGraph(): void {

		let newValues: any[] = new Array();
		let topSelected: any[] = new Array();

		if(this.isDatasetReady()) {

			let infectedIndia: Country = this.covidConfirmedData.getCountries()[0];
			let recoveredIndia: Country = this.covidRecoveryData.getCountries()[0];
			let deceasedIndia: Country = this.covidDeathData.getCountries()[0];

			for(let province of infectedIndia.getProvinces()) {

				let series: any[] = new Array();

				if(this.covidIndiaRegionsBarGraph.viewInfected) series.push({
					"name": "Infected",
					"value": infectedIndia.getProvinceByName(province.getName()).getLastTimeseries().getValue()
				});

				if(this.covidIndiaRegionsBarGraph.viewRecovered) series.push({
					"name": "Recovered",
					"value": recoveredIndia.getProvinceByName(province.getName()).getLastTimeseries().getValue()
				});

				if(this.covidIndiaRegionsBarGraph.viewDeceased) series.push({
					"name": "Deceased",
					"value": deceasedIndia.getProvinceByName(province.getName()).getLastTimeseries().getValue()
				});

				newValues.push({
					"name": province.getName(),
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

			for(let i: number = 0; i < this.covidIndiaRegionsBarGraph.selectedRegionCount; i++) topSelected.push(newValues[i]);
	
			this.covidIndiaRegionsBarGraph.multi = topSelected;			
		}
	}

	private prepareCovidIndiaProgressLineChart(): void {
		if(this.covidConfirmedData && this.covidRecoveryData && this.covidDeathData && this.covidConfirmedData.getCountries() && this.covidRecoveryData.getCountries() && this.covidDeathData.getCountries())
			this.covidIndiaProgressLineChart.multi = [{
				"name": "Infection",
				"series": this.workhorse.getCountryTotalInfectionProgress(this.covidConfirmedData, "India", this.covidIndiaProgressLineChart.latestDays)
			}, {
				"name": "Recovery",
				"series": this.workhorse.getCountryTotalRecoveryProgress(this.covidRecoveryData, "India", this.covidIndiaProgressLineChart.latestDays)
			}, {
				"name": "Deceased",
				"series": this.workhorse.getCountryTotalDeathProgress(this.covidDeathData, "India", this.covidIndiaProgressLineChart.latestDays)
			}];
	}

	private prepareCovidIndiaRegionProgressLineChart(): void {
		if(this.isDatasetReady()) this.covidIndiaStateProgressLineChart.multi = [{
			"name": "Infection",
			"series": this.workhorse.getRegionTotalAffectedProgress(this.covidConfirmedData, "India", this.covidIndiaStateProgressLineChart.selectedState, this.covidIndiaStateProgressLineChart.latestDays)
		}, {
			"name": "Recovery",
			"series": this.workhorse.getRegionTotalAffectedProgress(this.covidRecoveryData, "India", this.covidIndiaStateProgressLineChart.selectedState, this.covidIndiaStateProgressLineChart.latestDays)
		}, {
			"name": "Deceased",
			"series": this.workhorse.getRegionTotalAffectedProgress(this.covidDeathData, "India", this.covidIndiaStateProgressLineChart.selectedState, this.covidIndiaStateProgressLineChart.latestDays)
		}];
	}

	private prepareCovidIndiaRegionComparisonLineChart(): void {

		let newValues: any[] = new Array();
		let india: Country;

		switch(this.covidIndiaProgressLineChart.statewisePlotSelection) {

			case '1':

				if(this.covidConfirmedData && this.covidConfirmedData.getCountries() && (this.covidConfirmedData.getCountries().length == 1)) {

					india = this.covidConfirmedData.getCountries()[0];

					for(let province of india.getProvinces()) newValues.push({
						"name": province.getName(),
						"series": this.workhorse.getRegionTotalAffectedProgress(this.covidConfirmedData, "India", province.getName(), this.covidIndiaProgressLineChart.latestDays)
					});
				} break;

			case '2':

				if(this.covidRecoveryData && this.covidRecoveryData.getCountries() && (this.covidRecoveryData.getCountries().length == 1)) {

					india = this.covidRecoveryData.getCountries()[0];

					for(let province of india.getProvinces()) newValues.push({
						"name": province.getName(),
						"series": this.workhorse.getRegionTotalAffectedProgress(this.covidRecoveryData, "India", province.getName(), this.covidIndiaProgressLineChart.latestDays)
					});
				} break;

			case '3':

				if(this.covidDeathData && this.covidDeathData.getCountries() && (this.covidDeathData.getCountries().length == 1)) {

					india = this.covidDeathData.getCountries()[0];

					for(let province of india.getProvinces()) newValues.push({
						"name": province.getName(),
						"series": this.workhorse.getRegionTotalAffectedProgress(this.covidDeathData, "India", province.getName(), this.covidIndiaProgressLineChart.latestDays)
					});
				} break;
		}

		this.covidIndiaProgressLineChart.multi = newValues;
	}

	private setCovidIndiaProgressLineChartYAxislabel(): void {

		if(this.covidIndiaProgressLineChart.showAllStates) switch(this.covidIndiaProgressLineChart.statewisePlotSelection) {
			case '1': this.covidIndiaProgressLineChart.yAxisLabel = 'Infected'; break;
			case '2': this.covidIndiaProgressLineChart.yAxisLabel = 'Deaths'; break;
			case '3': this.covidIndiaProgressLineChart.yAxisLabel = 'Recovery'; break;
		} else this.covidIndiaProgressLineChart.yAxisLabel = 'Affected';
	}

	private isDatasetReady(): boolean {
		return (this.covidConfirmedData && this.covidRecoveryData && this.covidDeathData && this.covidConfirmedData.getCountries() && this.covidRecoveryData.getCountries() && this.covidDeathData.getCountries() && (this.covidConfirmedData.getCountries().length > 0) && (this.covidRecoveryData.getCountries().length > 0) && (this.covidDeathData.getCountries().length > 0));
	}
}
