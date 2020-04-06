import { Coordinate } from '../model/coordinate';
import { Timeseries } from './timeseries';

export class Province {

	private name: string;
	private countryName: string;
	private coordinates: Coordinate;
	private timeseries: Timeseries[];
	private perCapitaIncome: number;
	private population: number;
	private avgTemperature: number;
	private provinceCode: string = 'n/a';

    constructor(name: string, countryName: string, coordinates: Coordinate, timeseries: Timeseries[]) {

		this.name = name;
		this.countryName = countryName;
		this.coordinates = coordinates;
		this.timeseries = timeseries;
	}

    public getName(): string {
        return this.name;
	}
	
	public getNameLabel(): string {
		return (this.name == 'n/a') ? this.countryName : this.name;
	}

    public setName(name: string) {
        this.name = name;
	}
	
	public getCoordinates(): Coordinate {
		return this.coordinates;
	}

	public getTimeseries(): Timeseries[] {
		return this.timeseries;
	}

	public getPerCapitaIncome(): number {
		return this.perCapitaIncome;
	}

	public setPerCapitaIncome(perCapitaIncome: number): void {
		this.perCapitaIncome = perCapitaIncome;
	}

	public getPopulation(): number {
		return this.population;
	}

	public setPopulation(population: number): void {
		this.population = population;
	}

	public getAvgTemperature(): number {
		return this.avgTemperature;
	}

	public setAvgTemperature(avgTemperature: number): void {
		this.avgTemperature = avgTemperature;
	}

	public getProvinceCode(): string {
		return this.provinceCode;
	}

	public setProvinceCode(code: string): void {
		this.provinceCode = code;
	}

	public getLastTimeseries(): Timeseries {
		return this.timeseries[this.timeseries.length - 1];
	}

	public getLatestNTimeseries(n: number): Timeseries[] {
		return this.timeseries.slice(Math.max(this.timeseries.length - n, 0));
	}
}