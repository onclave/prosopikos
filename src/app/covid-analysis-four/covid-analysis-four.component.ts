import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-covid-analysis-four',
	templateUrl: './covid-analysis-four.component.html',
	styleUrls: ['./covid-analysis-four.component.css', '../covid-analysis/covid-analysis.component.css', '../covid/covid.component.css']
})
export class CovidAnalysisFourComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	public navigateToAuthor(source): void {
		window.open(source, "_blank");
	}
}
