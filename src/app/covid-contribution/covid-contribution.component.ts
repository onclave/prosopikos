import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-covid-contribution',
	templateUrl: './covid-contribution.component.html',
	styleUrls: ['./covid-contribution.component.css', '../covid/covid.component.css']
})
export class CovidContributionComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	public navigateToAuthor(source): void {
		window.open(source, "_blank");
	}
}
