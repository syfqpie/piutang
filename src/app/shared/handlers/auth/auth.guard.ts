import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
		private authSvc: AuthService,
		private router: Router
	) { }

	async canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Promise<boolean> {
		const isRoot = route.url.length === 0
		if (this.authSvc._session === undefined) await this.authSvc.getSession()
		
		if (!this.authSvc._session &&
			(isRoot || route.url[0].path !== 'auth')) {
			return this.onNotAuthenticated(state)
		} else if (this.authSvc._session &&
			!isRoot && route.url[0].path === 'auth') {
			return this.onAuthenticated()
		}

		return true
	}

	/**
	 * Not authorized is triggered when no session found.
	 * User will be directed to login page.
	 * 
	 * @returns false
	 */
	onNotAuthenticated(state: RouterStateSnapshot) {
		this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } })
		return false
	}

	/**
	 * Triggered when session found and user
	 * are accessing auth routes
	 * 
	 * @returns false
	 */
	onAuthenticated() {
		this.router.navigate(['/home'])
		return false
	}

}
