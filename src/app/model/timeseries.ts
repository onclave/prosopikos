export class Timeseries {

	private date: string;
	private value: number;

	constructor(date: string, value: number) {

		this.date = date;
		this.value = value;
	}

	public getDate(): string {
		return this.date;
	}

	public getValue(): number {
		return this.value;
	}
}