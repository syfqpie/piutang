import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Profile } from 'src/app/shared/services/profile/profile.model';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { AboutComponent } from 'src/app/components/settings/about/about.component';
import { ChangePasswordComponent } from 'src/app/components/settings/change-password/change-password.component';
import { UpdateNameComponent } from 'src/app/components/settings/update-name/update-name.component';
import { SettingsConfig } from './settings.interface';
import { QueryKey, RedirectFrom } from 'src/app/shared/services/auth/auth.model';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit, OnInit, OnDestroy {

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

	// Child
	@ViewChild(AboutComponent) aboutComponent: AboutComponent | null = null
	@ViewChild(ChangePasswordComponent) changePasswordComponent: ChangePasswordComponent | null = null
	@ViewChild(UpdateNameComponent) updateNameComponent: UpdateNameComponent | null = null

	// Subscribe
	subscription: Subscription = new Subscription()

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private profileSvc: ProfileService,
		private authSvc: AuthService
	) { }

	ngOnInit(): void {
		this.profile = this.profileSvc.currentProfile
		this.subscription.add(
			this.profileSvc.profileSubject.subscribe(
				(data) => { this.profile = data }
			)
		)
	}

	ngAfterViewInit(): void {
		// Toggle if match param
		const redirectedFrom = this.route.snapshot.queryParamMap.get(QueryKey.REDIRECT)
		if (redirectedFrom === RedirectFrom.RESET) {
			this.onChangePassword()
		}
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe()
		}
	}

	onUpdateName() {
		if (this.updateNameComponent) this.updateNameComponent.toggle()
	}

	onChangePassword() {
		if (this.changePasswordComponent) this.changePasswordComponent.toggle()
	}

	onAbout() {
		if (this.aboutComponent) this.aboutComponent.toggle()
	}

	onLogout() {
		return this.authSvc.logout().then(() => { 
			this.router.navigate(['/auth', 'login']) 
		})
	}
	
}
