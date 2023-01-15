import { Component, OnInit } from '@angular/core';
import {
	NavigationCancel, NavigationEnd,
	NavigationError, NavigationStart, Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

	// Data
	title = 'poket'

	// Checker
	isResolving: Observable<boolean> = of(false)

	constructor(
		private router: Router
	) { }

	ngOnInit(): void {
		this.isResolving = this.router.events.pipe(
			filter(
			  (e) =>
				e instanceof NavigationStart ||
				e instanceof NavigationEnd ||
				e instanceof NavigationCancel ||
				e instanceof NavigationError
			),
			map((e) => e instanceof NavigationStart)
		)
	}
}
