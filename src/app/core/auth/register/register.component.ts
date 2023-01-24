import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthApiError } from '@supabase/supabase-js';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

	// Form
	public registerForm: FormGroup = new FormGroup({
		email: new FormControl(null),
		password: new FormControl(null),
		options: new FormGroup({
			data: new FormGroup({
				name: new FormControl(null)
			})
		})
	})
	public formMessages = {
		email: [
			{ type: 'required', message: 'Email is required' },
			{ type: 'email', message: 'Enter a valid email address' }
		],
		password: [
			{ type: 'required', message: 'Password is required' },
			{ type: 'minlength', message: 'Password must contain at least 8 character' }
		],
		name: [
			{ type: 'required', message: 'Name is required' }
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

	ngOnInit(): void {
		this.initForm()
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe()
		}
	}

	get optionsGroup(): FormGroup {
		return this.registerForm.controls['options'].get('data') as FormGroup
	}

	/**
	 * Initialize form
	 */
	initForm() {
		this.registerForm = this.fb.group({
			email: new FormControl(null, Validators.compose([
				Validators.required,
				Validators.email
			])),
			password: new FormControl(null, Validators.compose([
				Validators.required,
				Validators.minLength(8)
			])),
			options: this.fb.group({
				data: this.fb.group({
					name: new FormControl(null, Validators.compose([
						Validators.required
					]))
				})
			})
		})
	}

	/**
	 * Validate form on submit and
	 * proceed if no issue
	 */
	onSubmit(): void {
		if (!this.registerForm.touched) this.registerForm.markAllAsTouched()
		if (this.registerForm.valid) this.doRegister()
	}

	/**
	 * Send http request to register
	 */
	private async doRegister(): Promise<void> {
		this.isLoading = true
    
		try {
			await this.authSvc.register(this.registerForm.value)
			this.router.navigate(['/home'])
		} catch(err) {
			if (err instanceof AuthApiError) {
				console.warn(err.message)
			}
		} finally {
			this.isLoading = false
		}
	}

}
