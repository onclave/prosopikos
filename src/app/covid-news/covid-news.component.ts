import { Component, OnInit } from '@angular/core';
import { CovidNewsService } from '../covid-news.service';

@Component({
	selector: 'app-covid-news',
	templateUrl: './covid-news.component.html',
	styleUrls: ['./covid-news.component.css', '../covid/covid.component.css']
})
export class CovidNewsComponent implements OnInit {

	private newsService: CovidNewsService;
	public newsObject: any[];

	constructor(newsService: CovidNewsService) {

		this.newsService = newsService;
		this.newsObject = this.newsService.getNewsObject();
	}

	ngOnInit(): void {
	}

	public navigateToNews(source): void {
		window.open(source, "_blank");
	}
}