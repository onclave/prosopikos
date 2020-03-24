import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-covid-about',
	templateUrl: './covid-about.component.html',
	styleUrls: ['./covid-about.component.css', '../covid/covid.component.css']
})
export class CovidAboutComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
		this.setupYoutubePlayer();
	}

	private setupYoutubePlayer(): void {

		const tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		document.body.appendChild(tag);
	}
}
