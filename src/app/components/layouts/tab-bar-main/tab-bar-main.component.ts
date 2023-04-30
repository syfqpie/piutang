import { Component, Input, OnInit } from '@angular/core';
import { TabBar } from './tab-bar.types';

@Component({
	selector: 'pkt-tab-bar-main',
	template: `
    <section
		id="bottom-navigation"
		class="block fixed inset-x-0 bottom-0
		z-10 shadow bg-white dark:bg-neutral-900">
		<div
			id="tabs"
			class="flex justify-between">
			<ng-template
				ngFor
				let-menu
				let-i="index"
				[ngForOf]="tabBarMenu">
				<a
					[routerLink]="menu.path"
					[routerLinkActive]="['tab-active']"
					class="w-full justify-center inline-block text-center p-3
					focus:text-emerald-800 dark:focus:text-emerald-600
					hover:text-emerald-800 dark:hover:text-emerald-600">
            		<i
						class="fa-lg"
						[class]="menu.icon">
					</i>
					<span
						*ngIf="isShowTitle"
						class="block text-xs">
						{{ menu.title }}
					</span>
          		</a>
       		</ng-template>
      	</div>
    </section>
  `,
	styles: [`
		@tailwind components;

		@layer components {
			.tab-active {
				@apply border-t-2 text-emerald-700 border-t-emerald-700
					   dark:text-emerald-500 dark:border-t-emerald-500;
			}
		}
    `]
})
export class TabBarMainComponent implements OnInit {

	@Input()
	tabBarMenu: TabBar[] = [
		{
			title: 'Home',
			path: ['/home'],
			icon: 'fa-solid fa-coins'
		},
		{
			title: 'Settings',
			path: ['/settings'],
			icon: 'fa-solid fa-bars-progress'
		}
	]

	@Input()
	isShowTitle: boolean = true

	constructor() { }

	ngOnInit(): void {
	}

}
