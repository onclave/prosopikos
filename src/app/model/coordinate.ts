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

	public getLongitude(): string {
		return this.longitude;
	}
}