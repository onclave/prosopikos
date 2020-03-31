import { Injectable } from '@angular/core';
import { CovidData } from './model/covidData';
import { Country } from './model/country';
import { Province } from './model/province';
import { Timeseries } from './model/timeseries';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
	providedIn: 'root'
})
export class CovidAnalysisService {

	private covidAnalysisTemperatureToInfectionLineGraph = {
		single: [],
		view: [1000, 500],
		showXAxis: true,
		showYAxis: true,
		showLegend: false,
		legendPosition: 'right',
		showXAxisLabel: true,
		showYAxisLabel: true,
		xAxisLabel: "Latitude",
		yAxisLabel: "Infection",
		colorScheme: {
			domain: [ '#D70518' ]
		},
		selectedProvinces: {},
		totalSelection: 50
	};

	private covidAnalysisTemperatureToInfectionSelectedLineGraph: CovidAnalysisTemperatureToInfectionSelectedLineGraphObject = {
		multi: [],
		view: [1000, 500],
		showXAxis: true,
		showYAxis: true,
		showLegend: true,
		legendPosition: 'right',
		showXAxisLabel: true,
		showYAxisLabel: true,
		xAxisLabel: "Latitude",
		yAxisLabel: "Infection",
		colorScheme: {
			domain: [ '#D70518', '#F55F96', '#F2ABC7', '#F2069F', '#F86660', '#BF110C', '#FF1610', '#DE8903', '#E84703' ]
		},
		latestDays: 14,
		chunks: [{
			start: -90,
			end: -60,
			provinces: []
		}, {
			start: -45,
			end: -30,
			provinces: []
		}, {
			start: -20,
			end: 16,
			provinces: []
		}, {
			start: 30,
			end: 45,
			provinces: []
		}, {
			start: 60,
			end: 90,
			provinces: []
		}],
		tableDatasource: [],
		tableColumns: [],
		tableUpdateCount: 0
	};

	private covidAnalysisTemperatureToInfectionScatterPlot = {
		bubbleData: [],
		view: [1000, 500],
		showXAxis: true,
		showYAxis: true,
		showLegend: true,
		legendPosition: 'right',
		showXAxisLabel: true,
		showYAxisLabel: true,
		xAxisLabel: "Latitude",
		yAxisLabel: "Infection",
		minRadius: 0,
		xScaleMin: 0,
		yScaleMin: 0,
		colorScheme: {
			domain: [ '#D70518', '#F55F96', '#F2ABC7', '#F2069F', '#F86660', '#BF110C', '#FF1610', '#DE8903', '#E84703' ]
		}
	};

	constructor() { }

	public getCovidAnalysisTemperatureToInfectionLineGraph(): {} {
		return this.covidAnalysisTemperatureToInfectionLineGraph;
	}

	public getCovidAnalysisTemperatureToInfectionSelectedLineGraph(): {} {
		return this.covidAnalysisTemperatureToInfectionSelectedLineGraph;
	}

	public getCovidAnalysisTemperatureToInfectionScatterPlot() {
		return this.covidAnalysisTemperatureToInfectionScatterPlot;
	}

	public getCovidTemperatureLatitudeMatTableDatasource(): any {
		return this.covidAnalysisTemperatureToInfectionSelectedLineGraph.tableDatasource;
	}

	public getCovidTemperatureLatitudeTableDisplayedColumns(): string[] {
		return this.covidAnalysisTemperatureToInfectionSelectedLineGraph.tableColumns;
	}

	public prepareCovidAnalysisTemperatureToInfectionLineGraph(provinces: Province[]): void {

		let newValues: any[] = new Array();

		if(provinces && (provinces.length > 0)) {

			provinces.sort((a: Province, b: Province) => {
				return +a.getCoordinates().getLatitude() - +b.getCoordinates().getLatitude();
			});

			for(let province of provinces) newValues.push({
				"name": province.getCoordinates().getRoundedLatitude(),
				"value": province.getLastTimeseries().getValue()
			});

			this.covidAnalysisTemperatureToInfectionLineGraph.selectedProvinces = provinces;
			this.covidAnalysisTemperatureToInfectionLineGraph.single = [{
				"name": "Rate of Infection",
				"series": newValues
			}];
		}
	}

	public prepareCovidAnalysisTemperatureToInfectionSelectedLineGraph(provinces: Province[], chunks: any[], latestDays: number): void {

		let newValues: any[] = new Array();
		let seriesList: any[] = new Array();

		if(provinces && (provinces.length > 0)) {

			for(let i: number = 0; i < latestDays; i++) seriesList.push(new Array());

			provinces.sort((a: Province, b: Province) => {
				return +a.getCoordinates().getLatitude() - +b.getCoordinates().getLatitude();
			});

			for(let chunk of chunks) {

				let selectedProvinces: Province[] = this.selectProvinceFromChunk(provinces, chunk);
				chunk.provinces = selectedProvinces;

				for(let i: number = 0; i < latestDays; i++)
					for(let province of selectedProvinces) seriesList[i].push({
						"name": province.getCoordinates().getRoundedLatitude(),
						"value": province.getLatestNTimeseries(latestDays)[i].getValue()
					});
			}

			for(let j: number = 0; j < latestDays; j++) {

				let lastNTimeseries: Timeseries[] = provinces[0].getLatestNTimeseries(latestDays);

				newValues.push({
					"name": lastNTimeseries[j].getDate(),
					"series": seriesList[j]
				});
			}

			this.covidAnalysisTemperatureToInfectionSelectedLineGraph.multi = newValues;

			this.prepareCovidTemperatureLatitudeTableData();
			this.prepareCovidAnalysisTemperatureToInfectionScatterPlot(provinces);
		}
	}

	public prepareCovidAnalysisTemperatureToInfectionScatterPlot(provinces: Province[]): void {

		let newValues: any[] = new Array();

		if(provinces && (provinces.length > 0)) {

			for(let province of provinces) newValues.push({
				"name": province.getNameLabel(),
				"series": [{
					"name": "Confirmed Infections",
					"x": province.getCoordinates().getRoundedLatitude(),
					"y": province.getLastTimeseries().getValue(),
					"r": province.getLastTimeseries().getValue()
				}]
			});
			
			this.covidAnalysisTemperatureToInfectionScatterPlot.bubbleData = newValues;
		}
	}

	private prepareCovidTemperatureLatitudeTableData(): void {

		if(++this.covidAnalysisTemperatureToInfectionSelectedLineGraph.tableUpdateCount == 1) {
			this.covidAnalysisTemperatureToInfectionSelectedLineGraph.tableColumns.push(...['latitudeRange', 'areaCount', 'infectionRate']);
			this.covidAnalysisTemperatureToInfectionSelectedLineGraph.tableDatasource.push(...this.getDatatableFriendlyTemperatureLatitudeData().reverse());
		}
	}

	private getDatatableFriendlyTemperatureLatitudeData(): any[] {

		let datasource: any[] = new Array();

		for(let chunk of this.covidAnalysisTemperatureToInfectionSelectedLineGraph.chunks) datasource.push({
			latitudeRange: this.prepareLatitudeRangeString(chunk.start, chunk.end),
			areaCount: chunk.provinces.length,
			infectionRate: this.getAverageRateOfInfection(chunk.provinces)
		});

		return datasource;
	}

	private selectProvinceFromChunk(sortedProvinces: Province[], chunk: { start: number, end: number }): Province[] {

		let selectedProvinces: Province[] = new Array();

		for(let i: number = 0; i < sortedProvinces.length; i++) {

			let latitude: number = +sortedProvinces[i].getCoordinates().getLatitude();

			if((latitude >= chunk.start) && (latitude <= chunk.end)) selectedProvinces.push(sortedProvinces[i]);
			if(latitude > chunk.end) break;
		}

		return selectedProvinces;
	}

	private getAverageRateOfInfection(provinces: Province[]): number {
		
		let avg: number = 0;
		let total: number = 0;

		if(provinces.length < 1) return avg;

		for(let province of provinces) total += province.getLastTimeseries().getValue();

		avg = total /provinces.length;

		return Math.round((avg + Number.EPSILON) * 100) / 100;
	}

	private prepareLatitudeRangeString(start: number, end: number): string {
		return '( ' + end + ' ' + ((end > 0) ? 'North' : 'South') + ' to ' + start + ' ' + ((start > 0) ? 'North' : 'South') + ' )';
	}

	private prepareLatitudeRangeShortString(start: number, end: number): string {
		return end + ((end > 0) ? 'N' : 'S') + ' to ' + start + ((start > 0) ? 'N' : 'S');
	}
}

interface CovidAnalysisTemperatureToInfectionSelectedLineGraphObject {
	multi: any[],
	view: [ number, number ],
	showXAxis: boolean,
	showYAxis: boolean,
	showLegend: boolean,
	legendPosition: string,
	showXAxisLabel: boolean,
	showYAxisLabel: boolean,
	xAxisLabel: string,
	yAxisLabel: string,
	colorScheme: {},
	latestDays: 14,
	chunks: LatitudeChunk[],
	tableDatasource: any[],
	tableColumns: string[],
	tableUpdateCount: number
};

interface LatitudeChunk {
	start: number,
	end: number,
	provinces: Province[]
}