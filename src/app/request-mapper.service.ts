import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RequestMapperService {

	public static readonly ROOT_URL: string = '/';
	public static readonly ROOT_URL_RELATIVE: string = '';

	private constructor() {
	}

	public static getAbsoluteUrl(url: string): string {
		return RequestMapperService.ROOT_URL + url;
	}
}
