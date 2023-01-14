import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'pui-layout-main',
	template: `
    <div class="min-h-screen w-screen flex flex-col">
		<pkt-navbar-main></pkt-navbar-main>

		<div class="px-2 md:px-40 py-2.5 text-neutral-900 dark:text-white overflow-scroll">
			<router-outlet></router-outlet>
			<pkt-tab-bar-main [isShowTitle]="false"></pkt-tab-bar-main>
		</div>
    </div>
  `,
	styles: [
	]
})
export class LayoutMainComponent implements OnInit {

	constructor(
		private authSvc: AuthService
	) { }

	ngOnInit(): void {
		// this.authSvc.getSession().then(({ data }) => {console.log('test', data)})
	}

}
