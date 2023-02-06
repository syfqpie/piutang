import { Injectable } from '@angular/core';
import {
	Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot,
	Router
} from '@angular/router';

import { DebtService } from '../../services/debt/debt.service';

@Injectable({
	providedIn: 'root'
})
export class DebtResolver implements Resolve<boolean> {

	constructor(
		private debtSvc: DebtService,
		private router: Router
	) { }

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
		// Try to get profile debt
		try {
			await this.debtSvc.retrieve(route.params['id'])
		} catch (err) {
			throw err
		} finally {
			if (!this.debtSvc.debt) {
				return this.router.navigate(['/home'])
			}
		}

		return this.debtSvc.debt
	}

}
