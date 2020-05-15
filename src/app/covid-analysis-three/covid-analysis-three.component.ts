import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-covid-analysis-three',
	templateUrl: './covid-analysis-three.component.html',
	styleUrls: ['./covid-analysis-three.component.css', '../covid-analysis/covid-analysis.component.css', '../covid/covid.component.css']
})
export class CovidAnalysisThreeComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	public navigateToAuthor(source): void {
		window.open(source, "_blank");
	}
}
