import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'piu-navbar-main',
	template: `
    <nav
		class="bg-white border-gray-200 px-2
		md:px-40 py-2.5 rounded dark:bg-gray-900
		shadow-lg">
		<div
			class="container flex flex-wrap
			items-center justify-between mx-auto">
			<div class="flex items-start">
				<button
					type="button"
					class="px-3 py-2 mr-3 rounded-lg border font-medium text-xs 
					text-center text-emerald-700 border-emerald-700
					hover:text-white hover:bg-emerald-800 focus:outline
					focus:outline-2 focus:outline-emerald-300 dark:text-emerald-500
					dark:border-emerald-500 dark:hover:text-white
					dark:hover:bg-emerald-600 dark:focus:outline-emerald-800
					disabled:cursor-not-allowed">
					<i class="fa-solid fa-angle-left"></i>
					Back
				</button>
			</div>

			<div class="flex items-center">
				<h3 class="text-white font-semibold">
					HOME
				</h3>
			</div>

			<div class="flex items-end">
				<button
					type="button"
					class="px-3 py-2 mr-3 md:mr-0 rounded-lg font-medium text-xs
					text-center text-white bg-emerald-700 hover:bg-emerald-800
					focus:outline focus:outline-2 focus:outline-emerald-300
					dark:bg-emerald-600 dark:hover:bg-emerald-700
					dark:focus:outline-emerald-500 disabled:cursor-not-allowed">
					<i class="fa-solid fa-plus me-2"></i>
					New
				</button>
			</div>
		</div>
    </nav>
  `,
	styles: [
	]
})
export class NavbarMainComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

}
