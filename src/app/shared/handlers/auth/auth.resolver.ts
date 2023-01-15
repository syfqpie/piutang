import { Injectable } from '@angular/core';
import {
	Resolve,
	RouterStateSnapshot,
	ActivatedRouteSnapshot,
	Router
} from '@angular/router';
import { EMPTY } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { ProfileService } from '../../services/profile/profile.service';

@Injectable({
	providedIn: 'root'
})
export class AuthResolver implements Resolve<any> {

	constructor(
		private authSvc: AuthService,
		private profileSvc: ProfileService,
		private router: Router
	) { }

	async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
		// Try to check if user is authenticated 
		try {
			if (this.authSvc._session === undefined) await this.authSvc.getSession()
		} catch (err) {
			throw err
		} finally {
			if (!this.authSvc._session) {
				return this.router.navigate(['/auth/login'])
			}
		}

		// Try to get authenticated user's profile
		try {
			if (!this.profileSvc.currentProfile) await this.profileSvc.get()
		} catch (err) {
			throw err
		} finally {
			if (!this.profileSvc.currentProfile) {
				return this.router.navigate(['/auth/login'])
			}
		}

		return EMPTY
	}

}