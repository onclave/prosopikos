import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CovidData } from '../model/covidData';
import { CoviddataService } from '../coviddata.service';
import { CovidDatasetViewerService } from '../covid-dataset-viewer.service';
import { WorkhorseService } from '../workhorse.service';

@Component({
	selector: 'app-covid-datasets',
	templateUrl: './covid-datasets.component.html',
	styleUrls: ['./covid-datasets.component.css', '../covid/covid.component.css']
})
export class CovidDatasetsComponent implements OnInit {

	private coviddataService: CoviddataService;
	private workhorse: WorkhorseService;
	private covidDatasetViewerService: CovidDatasetViewerService;

	public covidIndiaConfirmedData: CovidData = new CovidData();
	public covidIndiaDeathData: CovidData = new CovidData();
	public covidIndiaRecoveryData: CovidData = new CovidData();
	public covidWorldConfirmedData: CovidData = new CovidData();
	public covidWorldDeathData: CovidData = new CovidData();
	public covidWorldRecoveryData: CovidData = new CovidData();

	public COVID_INDIA_CONFIRMED_MAT_TABLE_DATASCOURCE: MatTableDataSource<any[]>;
	public COVID_INDIA_RECOVERED_MAT_TABLE_DATASCOURCE: MatTableDataSource<any[]>;
	public COVID_INDIA_DEATH_MAT_TABLE_DATASCOURCE: MatTableDataSource<any[]>;
	public COVID_WORLD_CONFIRMED_MAT_TABLE_DATASCOURCE: MatTableDataSource<any[]>;
	public COVID_WORLD_RECOVERED_MAT_TABLE_DATASCOURCE: MatTableDataSource<any[]>;
	public COVID_WORLD_DEATH_MAT_TABLE_DATASCOURCE: MatTableDataSource<any[]>;

	public covidIndiaConfirmedTableDisplayedColumns: string[] = new Array();
	public covidIndiaRecoveredTableDisplayedColumns: string[] = new Array();
	public covidIndiaDeathTableDisplayedColumns: string[] = new Array();
	public covidWorldConfirmedTableDisplayedColumns: string[] = new Array();
	public covidWorldRecoveredTableDisplayedColumns: string[] = new Array();
	public covidWorldDeathTableDisplayedColumns: string[] = new Array();

	@ViewChild('covidIndiaTimeseriesConfirmedDatatable') covidIndiaConfirmedTable: MatTable<any>;
	@ViewChild('covidIndiaTimeseriesRecoveredDatatable') covidIndiaRecoveredTable: MatTable<any>;
	@ViewChild('covidIndiaTimeseriesDeceasedDatatable') covidIndiaDeathTable: MatTable<any>;
	@ViewChild('covidWorldTimeseriesConfirmedDatatable') covidWorldConfirmedTable: MatTable<any>;
	@ViewChild('covidWorldTimeseriesRecoveredDatatable') covidWorldRecoveredTable: MatTable<any>;
	@ViewChild('covidWorldTimeseriesDeceasedDatatable') covidWorldDeathTable: MatTable<any>;

	@ViewChild('ciPaginator', {static: true}) ciPaginator: MatPaginator;
	@ViewChild('riPaginator', {static: true}) riPaginator: MatPaginator;
	@ViewChild('diPaginator', {static: true}) diPaginator: MatPaginator;
	@ViewChild('cwPaginator', {static: true}) cwPaginator: MatPaginator;
	@ViewChild('rwPaginator', {static: true}) rwPaginator: MatPaginator;
	@ViewChild('dwPaginator', {static: true}) dwPaginator: MatPaginator;

	constructor(coviddataService: CoviddataService, workhorse: WorkhorseService, covidDatasetViewerService: CovidDatasetViewerService) {

		this.coviddataService = coviddataService;
		this.workhorse = workhorse;
		this.covidDatasetViewerService = covidDatasetViewerService;
	}

	ngOnInit(): void {

		this.covidIndiaConfirmedData = this.coviddataService.getIndiaConfirmedCovidData();
		this.covidIndiaRecoveryData = this.coviddataService.getIndiaRecoveryCovidData();
		this.covidIndiaDeathData = this.coviddataService.getIndiaDeathCovidData();
		this.covidWorldConfirmedData = this.coviddataService.getWorldConfirmedCovidData();
		this.covidWorldRecoveryData = this.coviddataService.getWorldRecoveryCovidData();
		this.covidWorldDeathData = this.coviddataService.getWorldDeathCovidData();

		this.covidDatasetViewerService.setupCovidIndiaConfirmedDatatable(this.setupciData);
		this.covidDatasetViewerService.setupCovidIndiaRecoveryDatatable(this.setupriData);
		this.covidDatasetViewerService.setupCovidIndiaDeathDatatable(this.setupdiData);
		this.covidDatasetViewerService.setupCovidWorldConfirmedDatatable(this.setupcwData);
		this.covidDatasetViewerService.setupCovidWorldRecoveryDatatable(this.setuprwData);
		this.covidDatasetViewerService.setupCovidWorldDeathDatatable(this.setupdwData);
	}

	ngAfterViewInit(): void {

	}

	private setupciData = function() {

		this.covidIndiaConfirmedTableDisplayedColumns = this.workhorse.getDatatableFriendlyCovidIndiaTimeseriesHeaders(this.covidIndiaConfirmedData.getHeaders());
		this.COVID_INDIA_CONFIRMED_MAT_TABLE_DATASCOURCE = new MatTableDataSource<any[]>(this.workhorse.getDatatableFriendlyCovidIndiaTimeseriesData(this.covidIndiaConfirmedData));
		this.COVID_INDIA_CONFIRMED_MAT_TABLE_DATASCOURCE.paginator = this.ciPaginator;
	}.bind(this);

	private setupriData = function() {

		this.covidIndiaRecoveredTableDisplayedColumns = this.workhorse.getDatatableFriendlyCovidIndiaTimeseriesHeaders(this.covidIndiaRecoveryData.getHeaders());
		this.COVID_INDIA_RECOVERED_MAT_TABLE_DATASCOURCE = new MatTableDataSource<any[]>(this.workhorse.getDatatableFriendlyCovidIndiaTimeseriesData(this.covidIndiaRecoveryData));
		this.COVID_INDIA_RECOVERED_MAT_TABLE_DATASCOURCE.paginator = this.riPaginator;
	}.bind(this);

	private setupdiData = function() {

		this.covidIndiaDeathTableDisplayedColumns = this.workhorse.getDatatableFriendlyCovidIndiaTimeseriesHeaders(this.covidIndiaDeathData.getHeaders());
		this.COVID_INDIA_DEATH_MAT_TABLE_DATASCOURCE = new MatTableDataSource<any[]>(this.workhorse.getDatatableFriendlyCovidIndiaTimeseriesData(this.covidIndiaDeathData));
		this.COVID_INDIA_DEATH_MAT_TABLE_DATASCOURCE.paginator = this.diPaginator;
	}.bind(this);

	private setupcwData = function() {

		this.covidWorldConfirmedTableDisplayedColumns = this.workhorse.getDatatableFriendlyCovidTimeseriesHeaders(this.covidWorldConfirmedData.getHeaders());
		this.COVID_WORLD_CONFIRMED_MAT_TABLE_DATASCOURCE = new MatTableDataSource<any[]>(this.workhorse.getDatatableFriendlyCovidTimeseriesData(this.covidWorldConfirmedData));
		this.COVID_WORLD_CONFIRMED_MAT_TABLE_DATASCOURCE.paginator = this.cwPaginator;
	}.bind(this);

	private setuprwData = function() {

		this.covidWorldRecoveredTableDisplayedColumns = this.workhorse.getDatatableFriendlyCovidTimeseriesHeaders(this.covidWorldRecoveryData.getHeaders());
		this.COVID_WORLD_RECOVERED_MAT_TABLE_DATASCOURCE = new MatTableDataSource<any[]>(this.workhorse.getDatatableFriendlyCovidTimeseriesData(this.covidWorldRecoveryData));
		this.COVID_WORLD_RECOVERED_MAT_TABLE_DATASCOURCE.paginator = this.rwPaginator;
	}.bind(this);

	private setupdwData = function() {

		this.covidWorldDeathTableDisplayedColumns = this.workhorse.getDatatableFriendlyCovidTimeseriesHeaders(this.covidWorldDeathData.getHeaders());
		this.COVID_WORLD_DEATH_MAT_TABLE_DATASCOURCE = new MatTableDataSource<any[]>(this.workhorse.getDatatableFriendlyCovidTimeseriesData(this.covidWorldDeathData));
		this.COVID_WORLD_DEATH_MAT_TABLE_DATASCOURCE.paginator = this.dwPaginator;
	}.bind(this);
}
