import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-covid-analysis-two',
	templateUrl: './covid-analysis-two.component.html',
	styleUrls: ['./covid-analysis-two.component.css', '../covid-analysis/covid-analysis.component.css', '../covid/covid.component.css']
})
export class CovidAnalysisTwoComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	public navigateToAuthor(source): void {
		window.open(source, "_blank");
	}
}
