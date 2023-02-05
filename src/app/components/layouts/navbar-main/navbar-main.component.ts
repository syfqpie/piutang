import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
	selector: 'pkt-navbar-main',
	template: `
    <nav
		class="bg-white border-gray-200 px-2
		md:px-40 py-2.5 rounded dark:bg-neutral-900
		shadow-md dark:shadow-lg">
		<div
			class="container grid grid-cols-3">
			<div class="col-span-1 flex justify-start">
				<ng-container *ngIf="router.url !== '/home'">
					<button
						type="button"
						class="px-3 py-2 mr-3 rounded-lg border font-medium text-xs 
						text-center text-emerald-700 border-emerald-600
						hover:text-white hover:bg-emerald-700 focus:outline
						focus:outline-2 focus:outline-emerald-200 dark:text-emerald-500
						dark:border-emerald-500 dark:hover:text-white
						dark:hover:bg-emerald-600 dark:focus:outline-emerald-800
						disabled:cursor-not-allowed"
						[routerLink]="['/home']">
						<i class="fa-solid fa-angle-left"></i>
						Back
					</button>
				</ng-container>
			</div>

			<div class="col-span-1 flex items-center justify-center">
				<h3 class="text-neutral-900 dark:text-white font-semibold">
					{{ navbarTitle }}
				</h3>
			</div>

			<div class="col-span-1 flex justify-end">
				<ng-container *ngIf="router.url !== '/new-entry'">
					<button
						type="button"
						class="px-3 py-2 mr-3 md:mr-0 rounded-lg font-medium text-xs
						border text-center text-white bg-emerald-700 hover:bg-emerald-800
						focus:outline focus:outline-2 focus:outline-emerald-200
						dark:bg-emerald-600 dark:hover:bg-emerald-700 focus:border-emerald-500
						dark:focus:border-emerald-500 dark:border-emerald-600 
						dark:focus:outline-emerald-800 disabled:cursor-not-allowed"
						[routerLink]="['/new-entry']">
						<i class="fa-solid fa-plus me-2"></i>
						New
					</button>
				</ng-container>
			</div>
		</div>
    </nav>
  `,
	styles: [
	]
})
export class NavbarMainComponent implements OnInit, OnDestroy {

	// Data
	navbarTitle: string = ''

	// Subscriptions
	subscription: Subscription = new Subscription()

	constructor(
		private activatedRoute: ActivatedRoute,
		public router: Router
	) { }

	ngOnInit(): void {
		this.subscribeRouter()
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe()
		}
	}

	/**
	 * Set initial title and subscribe to
	 * router to update title on route changes
	 */
	subscribeRouter(): void {
		// Set initial
		const initialRoute = this.getChild(this.activatedRoute)
		this.navbarTitle = initialRoute.snapshot.data['title']

		this.subscription.add(
			this.router.events.pipe(
				filter((event) => event instanceof NavigationEnd),
			).subscribe(
				() => {
					const currentRoute = this.getChild(this.activatedRoute)
			
					currentRoute.data.subscribe(data => {
						// Set title
						this.navbarTitle = data['title']
					})
				}
				))
	}

	/**
	 * Recursively find the current route
	 * 
	 * @param activatedRoute current parent route
	 * 
	 * @returns current route
	 */
	getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
		if (activatedRoute.firstChild) return this.getChild(activatedRoute.firstChild)
		else return activatedRoute
	}

}
