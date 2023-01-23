import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { Profile } from './profile.model';

const PROFILES = 'profiles'

@Injectable({
	providedIn: 'root'
})
export class ProfileService {

	public currentProfile: Profile | null = null
	public profileSubject: Subject<Profile | null> = new Subject<Profile | null>()

	constructor(
		private authSvc: AuthService
	) { }
	
	/**
	 * Get auth user's profile
	 * 
	 * @returns supabase select profile
	 */
	async get() {
		return await this.authSvc.supabase
			.from(PROFILES)
			.select('*')
			.then(({ data, error }) => {
				if (data && data.length === 1) {
				  this.currentProfile = data[0]
				  this.profileSubject.next(this.currentProfile)
				}

				if (error || !this.currentProfile) {
					throw error
				}
			})
	}

	/**
	 * Patch auth user's profile
	 * 
	 * @returns supabase update and select profile
	 */
	async patch(payload: Profile) {
		return await this.authSvc.supabase
			.from(PROFILES)
			.update(payload)
			.eq('id', this.currentProfile!.id)
			.select()
			.then(({ data, error }) => {
				if (data && data.length === 1) {
					this.currentProfile = data[0]
					this.profileSubject.next(this.currentProfile)
				}
  
				if (error || !this.currentProfile) {
					throw error
				}
			})
	}
}
