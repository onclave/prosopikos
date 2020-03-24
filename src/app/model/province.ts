import { Coordinate } from '../model/coordinate';
import { Timeseries } from './timeseries';

export class Province {

	private name: string;
	private coordinates: Coordinate;
	private timeseries: Timeseries[];

    constructor(name: string, coordinates: Coordinate, timeseries: Timeseries[]) {

		this.name = name;
		this.coordinates = coordinates;
		this.timeseries = timeseries;
    }

    public getName(): string {
        return this.name;
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

	public getLastTimeseries(): Timeseries {
		return this.timeseries[this.timeseries.length - 1];
	}

	public getLatestNTimeseries(n: number): Timeseries[] {
		return this.timeseries.slice(Math.max(this.timeseries.length - n, 0));
	}
}