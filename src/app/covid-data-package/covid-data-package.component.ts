import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-covid-data-package',
	templateUrl: './covid-data-package.component.html',
	styleUrls: ['./covid-data-package.component.css', '../covid/covid.component.css', '../covid-analysis/covid-analysis.component.css', '../home/home.component.css']
})
export class CovidDataPackageComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	public navigateToLink(source): void {
		window.open(source, "_blank");
	}
}
