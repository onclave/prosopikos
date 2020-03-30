import { Component, OnInit } from '@angular/core';
import { CovidAnalysisService } from '../covid-analysis.service';
import { CoviddataService } from '../coviddata.service';
import { WorkhorseService } from '../workhorse.service';
import { CovidData } from '../model/covidData';
import { Province } from '../model/province';
import { MatSliderChange } from '@angular/material/slider';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';

@Component({
	selector: 'app-covid-analysis',
	templateUrl: './covid-analysis.component.html',
	styleUrls: ['./covid-analysis.component.css', '../covid/covid.component.css']
})
export class CovidAnalysisComponent implements OnInit {

	private xs: string = '(max-width: 599px)';
	private smMin: string = '(min-width: 600px)';
	private smMax: string = '(max-width: 959px)';
	private mdMin: string = '(min-width: 960px)';
	private mdMax: string = '(max-width: 1279px)';
	private lgMin: string = '(min-width: 1280px)';

	private breakpointObserver: BreakpointObserver;
	private covidAnalysisService: CovidAnalysisService;
	private coviddataService: CoviddataService;
	private workhorse: WorkhorseService;

	public covidConfirmedData: CovidData;
	public covidAnalysisTemperatureToInfectionLineGraph = null;
	public covidAnalysisTemperatureToInfectionSelectedLineGraph = null;

	public COVID_TEMPERATURE_LATITUDE_MAT_TABLE_DATASCOURCE: MatTableDataSource<any[]>;
	public covidTemperatureLatitudeTableDisplayedColumns: string[] = new Array();

	constructor(covidAnalysisService: CovidAnalysisService, coviddataService: CoviddataService, workhorse: WorkhorseService, breakpointObserver: BreakpointObserver) {

		this.covidAnalysisService = covidAnalysisService;
		this.coviddataService = coviddataService;
		this.workhorse = workhorse;
		this.breakpointObserver = breakpointObserver;
	}

	ngOnInit(): void {

		this.covidConfirmedData = this.coviddataService.getConfirmedCovidData();
		this.covidAnalysisTemperatureToInfectionLineGraph = this.covidAnalysisService.getCovidAnalysisTemperatureToInfectionLineGraph();
		this.covidAnalysisTemperatureToInfectionSelectedLineGraph = this.covidAnalysisService.getCovidAnalysisTemperatureToInfectionSelectedLineGraph();
		this.COVID_TEMPERATURE_LATITUDE_MAT_TABLE_DATASCOURCE = this.covidAnalysisService.getCovidTemperatureLatitudeMatTableDatasource();
		this.covidTemperatureLatitudeTableDisplayedColumns = this.covidAnalysisService.getCovidTemperatureLatitudeTableDisplayedColumns();

		this.reshufflePlaces();
		this.covidAnalysisService.prepareCovidAnalysisTemperatureToInfectionSelectedLineGraph(this.workhorse.selectAllProvinces(this.covidConfirmedData), this.covidAnalysisTemperatureToInfectionSelectedLineGraph.chunks, this.covidAnalysisTemperatureToInfectionSelectedLineGraph.latestDays);

		this.breakpointObserver.observe([this.xs]).subscribe((state: BreakpointState) => {
			if(state.matches) {
				
				let width: number = window.innerWidth - 20;

				this.covidAnalysisTemperatureToInfectionLineGraph.view = [width, 300];
				this.covidAnalysisTemperatureToInfectionSelectedLineGraph.view = [width, 300];
				this.covidAnalysisTemperatureToInfectionSelectedLineGraph.legendPosition = 'below';
			}
		});

		this.breakpointObserver.observe([this.smMin, this.smMax]).subscribe((state: BreakpointState) => {

			if(state[this.smMin] && state[this.smMax]) {
				
				let width: number = window.innerWidth - 20;

				this.covidAnalysisTemperatureToInfectionLineGraph.view = [width, 400];
				this.covidAnalysisTemperatureToInfectionSelectedLineGraph.view = [width, 400];
				this.covidAnalysisTemperatureToInfectionSelectedLineGraph.legendPosition = 'below';
			}
		});

		this.breakpointObserver.observe([this.mdMin, this.mdMax]).subscribe((state: BreakpointState) => {

			if(state[this.mdMin] && state[this.mdMax]) {
				
				let width: number = window.innerWidth - 50;

				this.covidAnalysisTemperatureToInfectionLineGraph.view = [width, 450];
				this.covidAnalysisTemperatureToInfectionSelectedLineGraph.view = [width, 450];
				this.covidAnalysisTemperatureToInfectionSelectedLineGraph.legendPosition = 'right';
			}
		});

		this.breakpointObserver.observe([this.lgMin]).subscribe((state: BreakpointState) => {
			if(state.matches) {

				this.covidAnalysisTemperatureToInfectionLineGraph.view = [1000, 550];
				this.covidAnalysisTemperatureToInfectionSelectedLineGraph.view = [1000, 550];
				this.covidAnalysisTemperatureToInfectionSelectedLineGraph.legendPosition = 'right';
			}
		});
	}

	public onSelectCovidAnalysisTemperatureToInfectionLineGraph(event): void {}

	public onSelectCovidAnalysisTemperatureToInfectionSelectedLineGraph(event): void {}

	public navigateToAuthor(source): void {
		window.open(source, "_blank");
	}

	public getTotalNumberOfPlaces(): number {

		let total: number = 0;

		if(this.covidConfirmedData && this.covidConfirmedData.getCountries() && (this.covidConfirmedData.getCountries().length > 0))
			for(let country of this.covidConfirmedData.getCountries()) total += country.getProvinces().length;

		return total;
	}

	public onSliderChangeCovidAnalysisTemperatureToInfectionLineGraph(event: MatSliderChange): void {

		this.covidAnalysisTemperatureToInfectionLineGraph.totalSelection = event.value;
		this.reshufflePlaces();
	}

	public reshufflePlaces() {
		this.covidAnalysisService.prepareCovidAnalysisTemperatureToInfectionLineGraph(this.workhorse.selectNRandomProvinces(this.covidConfirmedData, this.covidAnalysisTemperatureToInfectionLineGraph.totalSelection, this.getTotalNumberOfPlaces()));
	}
}
