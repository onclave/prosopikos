import { Country } from '../model/country';

export class CovidData {

    private countries: Country[];
    private headers: string[];

    constructor() {
        this.countries = new Array();
    }

    public getCountries(): Country[] {
        return this.countries;
    }

    public setCountries(countries: Country[]): void {
        this.countries = countries;
    }

    public getHeaders(): string[] {
        return this.headers;
    }

    public setHeaders(headers: string[]): void {
        this.headers = headers;
    }

    public addCountry(country: Country): void {
        this.countries.push(country);
    }

    public getCountryByName(name: string): Country {
        for(let country of this.countries) if(country.getName() == name) return country;
        return null;
    }

    public hasCountryByName(name: string): boolean {
        return this.getCountryByName(name) != null;
    }
}