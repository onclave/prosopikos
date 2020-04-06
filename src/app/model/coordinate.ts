export class Coordinate {

	private latitude: string;
	private longitude: string;

	constructor(latitude: string, longitude: string) {
		
		this.latitude = latitude;
		this.longitude = longitude;
	}

	public getLatitude(): string {
		return this.latitude;
	}

	public getRoundedLatitude(): string {
		return String(Math.round((+this.latitude + Number.EPSILON) * 1000) / 1000);
	}

	public getAbsoluteLatitude(): number {
		return Math.abs(+this.latitude);
	}

	public getLongitude(): string {
		return this.longitude;
	}
}