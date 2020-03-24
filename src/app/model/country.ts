import { Province } from '../model/province';

export class Country {

    private name: string;
    private provinces: Province[];

    constructor(name: string) {

        this.name = name;
        this.provinces = new Array();
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getProvinces(): Province[] {
        return this.provinces;
    }

    public setProvinces(provinces: Province[]) {
        this.provinces = provinces;
    }

    public addProvince(province: Province) {
        this.provinces.push(province);
    }
}