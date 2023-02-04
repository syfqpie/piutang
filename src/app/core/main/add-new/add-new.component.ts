import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { DebtType } from 'src/app/shared/services/debt/debt.model';
import { Human } from 'src/app/shared/services/human/human.model';
import { Profile } from 'src/app/shared/services/profile/profile.model';
import { DebtService } from 'src/app/shared/services/debt/debt.service';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';

@Component({
	selector: 'app-add-new',
	templateUrl: './add-new.component.html',
	styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit, OnDestroy {

	// Data
	profile: Profile | null = null

	// Predefined
	DebtType = DebtType

	/**
	 * CurrencyPipe stuff's here.
	 * Angular's reference: https://angular.io/api/common/CurrencyPipe
	 * 
	 * currency:'MYR':'symbol-narrow':'1.2-2'
	 * 
	 * digitsInfo format:
	 * - {minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
	 * 
	 * ISO 4217 currency code list https://en.wikipedia.org/wiki/ISO_4217
	 */
	readonly currCode = 'MYR'
	readonly currDisplay = 'symbol-narrow'
	readonly currDigitsInfo = '1.2-2'

	// Form
	createForm = new FormGroup({
		type: new FormControl(null),
		human: new FormControl(null),
		notes: new FormControl(null),
		amount: new FormControl(null),
		due_at: new FormControl(null)
	})
	formMessages = {
		type: [
			{ type: 'required', message: 'Need a type' }
		],
		human_id: [
			{ type: 'required', message: 'Need someone' }
		],
		notes: [
			{ type: 'required', message: 'Leave a note, nanti lupa' }
		],
		amount: [
			{ type: 'required', message: 'Need some numbers...' },
			{ type: 'min', message: 'That\'s impossible...' }
		]
	}
	selectedHuman: Human | null = null

	// Checker
	isLoading: boolean = false
	isShowCalendar: boolean = false

	// Event
	onResetEvent: EventEmitter<boolean> = new EventEmitter()

	// Subscribe
	subscription: Subscription = new Subscription()

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private profileSvc: ProfileService,
		private debtSvc: DebtService
	) { }

	ngOnInit(): void {
		this.initForm()

		this.profile = this.profileSvc.currentProfile
		this.subscription.add(
			this.profileSvc.profileSubject.subscribe(
				(data) => { this.profile = data }
			)
		)
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe()
		}
	}

	initForm() {
		this.createForm = this.fb.group({
			type: new FormControl(DebtType.LEND, Validators.compose([
				Validators.required
      		])),
			human_id: new FormControl(null, Validators.compose([
				Validators.required
      		])),
			notes: new FormControl(null, Validators.compose([
				Validators.required,
				Validators.maxLength(128)
			])),
			amount: new FormControl(null, Validators.compose([
				Validators.required,
				Validators.min(0.1)
			])),
			due_at: new FormControl(null)
		})
	}

	onSubmit() {
		if (!this.createForm.touched) this.createForm.markAllAsTouched()
		if (this.createForm.valid) this.doSave()
	}

	async doSave() {
		this.isLoading = true
		let isError = false
		try {
			await this.debtSvc.create(this.createForm.value)
		} catch (err) {
			// handler error
			isError = true
		} finally {
			this.isLoading = false
			if (!isError) {
				this.router.navigate(['/home'])
			}
		}
	}

	toggleCalendar() {
		return this.isShowCalendar = !this.isShowCalendar
	}

	onSelectDue(selected: Date) {
		this.createForm.controls['due_at'].patchValue(selected)
		this.toggleCalendar()
		console.log(this.createForm.value.due_at)
	}

	onResetDue() {
		this.createForm.controls['due_at'].patchValue(null)
		this.onResetEvent.emit(true)
	}

	onSelectType(selected: DebtType) {
		this.createForm.controls['type'].patchValue(selected)
	}

	onSelectHuman(selected: Human) {
		this.selectedHuman = selected
		this.createForm.controls['human_id'].patchValue(this.selectedHuman.id)
	}

}
