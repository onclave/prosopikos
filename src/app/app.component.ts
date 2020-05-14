import { Component, Inject } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	title: string = 'prosopikos';

	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {

		this.matIconRegistry.addSvgIcon(
			"github",
			this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/image/github.svg")
		);
	}

	go_to_github(): void {
		(window as any).open("https://github.com/onclave", "_blank");
	}
}
