import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CovidNewsService {

	private NEWS_API: string = 'https://raw.githubusercontent.com/onclave/prosopikos/master/raw/covid_news.json';

	constructor(private httpClient: HttpClient) {}

	public getNews() {
		return this.httpClient.get(this.NEWS_API);
	}
}
