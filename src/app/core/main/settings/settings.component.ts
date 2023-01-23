import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Profile } from 'src/app/shared/services/profile/profile.model';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

interface SettingsConfig {
	title: string,
	description: string,
	icon: string,
	handler: () => void
}

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

	// Data
	profile: Profile | null = null
	settings: SettingsConfig[] = [
		{ 
			title: 'Update name',
			description: 'Update your name here',
			icon: 'fa-regular fa-id-card',
			handler: () => this.onUpdateName()
		},
		{ 
			title: 'Change password',
			description: 'Change your password',
			icon: 'fa-solid fa-unlock-keyhole',
			handler: () => this.onChangePassword() 
		},
		{ 
			title: 'About',
			description: 'App information',
			icon: 'fa-solid fa-question',
			handler: () => this.onAbout() 
		},
		{ 
			title: 'Logout',
			description: 'Sign out of system',
			icon: 'fa-solid fa-arrow-right-from-bracket',
			handler: () => this.onLogout() 
		}
	]

	constructor(
		private router: Router,
		private profileSvc: ProfileService,
		private authSvc: AuthService
	) { }

	ngOnInit(): void {
		this.profile = this.profileSvc.currentProfile
	}

	onUpdateName() {
		console.log('onUpdateName')
	}

	onChangePassword() {
		console.log('onChangePassword')
	}

	onAbout() {
		console.log('onAbout')
	}

	onLogout() {
		return this.authSvc.logout().then(() => { 
			this.router.navigate(['/auth', 'login']) 
		})
	}
	

}
