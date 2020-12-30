import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private _snackBar: MatSnackBar) { }

	ngOnInit(): void {
	}

	public openUnderProgressSnackbar(): void {
		this._snackBar.openFromComponent(UnderProgressSnackbarComponent, {
			duration: 7000
		});
	}
}

@Component({
	selector: 'under-progress-snackbar-snack',
	template: '<span class="pr-font-cav pr-font-size-1-5-em">I was being too lazy. Try something else! 😓</span>'
})
export class UnderProgressSnackbarComponent {}