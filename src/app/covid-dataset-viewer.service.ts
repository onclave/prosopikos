import { Injectable, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CovidData } from './model/covidData';
import { WorkhorseService } from './workhorse.service';

@Injectable({
	providedIn: 'root'
})
export class CovidDatasetViewerService {

	private setupCovidIndiaConfirmedTableCallback = null;
	private setupCovidIndiaRecoveryTableCallback = null;
	private setupCovidIndiaDeathTableCallback = null;
	private setupCovidWorldConfirmedTableCallback = null;
	private setupCovidWorldRecoveryTableCallback = null;
	private setupCovidWorldDeathTableCallback = null;

	constructor() {
	}

	public setupCovidIndiaConfirmedDatatable(callback): void {
		this.setupCovidIndiaConfirmedTableCallback = callback;
	}

	public setupCovidIndiaRecoveryDatatable(callback): void {
		this.setupCovidIndiaRecoveryTableCallback = callback;
	}

	public setupCovidIndiaDeathDatatable(callback): void {
		this.setupCovidIndiaDeathTableCallback = callback;
	}

	public setupCovidWorldConfirmedDatatable(callback): void {
		this.setupCovidWorldConfirmedTableCallback = callback;
	}

	public setupCovidWorldRecoveryDatatable(callback): void {
		this.setupCovidWorldRecoveryTableCallback = callback;
	}

	public setupCovidWorldDeathDatatable(callback): void {
		this.setupCovidWorldDeathTableCallback = callback;
	}

	public prepareCovidIndiaConfirmedDatatable(): void {
		this.setupCovidIndiaConfirmedTableCallback();
	}

	public prepareCovidIndiaRecoveryDatatable(): void {
		this.setupCovidIndiaRecoveryTableCallback();
	}

	public prepareCovidIndiaDeathDatatable(): void {
		this.setupCovidIndiaDeathTableCallback();
	}

	public prepareCovidWorldConfirmedDatatable(): void {
		this.setupCovidWorldConfirmedTableCallback();
	}

	public prepareCovidWorldRecoveryDatatable(): void {
		this.setupCovidWorldRecoveryTableCallback();
	}

	public prepareCovidWorldDeathDatatable(): void {
		this.setupCovidWorldDeathTableCallback();
	}
}
