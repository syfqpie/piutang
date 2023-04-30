import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthApiError } from '@supabase/supabase-js';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-reset',
	templateUrl: './reset.component.html',
	styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit, OnDestroy {

	// Form
	public resetForm: FormGroup = new FormGroup({
		email: new FormControl(null)
	})
	public formMessages = {
		email: [
			{ type: 'required', message: 'Email is required' },
			{ type: 'email', message: 'Enter a valid email address' }
		]
	}

	// Checker
	public isLoading: boolean = false

	// Subscription
	private subscription: Subscription = new Subscription()

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authSvc: AuthService
	) { }

	ngOnInit() {
		this.initForm()
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe()
		}
	}

	/**
	 * Initialize form
	 */
	initForm() {
		this.resetForm = this.fb.group({
			email: new FormControl(null, Validators.compose([
				Validators.required,
				Validators.email
			]))
		})
	}

	/**
	 * Validate form on submit and
	 * proceed if no issue
	 */
	onSubmit(): void {
		if (!this.resetForm.touched) this.resetForm.markAllAsTouched()
		if (this.resetForm.valid) this.doRequestReset()
	}

	/**
	 * Send http request to login
	 */
	private async doRequestReset(): Promise<void> {
		this.isLoading = true

		try {
			await this.authSvc.resetPassword(this.resetForm.value.email)
		} catch (err) {
			if (err instanceof AuthApiError) {
				console.warn(err.message)
			}
		} finally {
			this.isLoading = false
		}
	}

}
