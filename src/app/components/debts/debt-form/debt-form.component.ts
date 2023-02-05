import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Debt, DebtType } from 'src/app/shared/services/debt/debt.model';
import { Human } from 'src/app/shared/services/human/human.model';
import { Profile } from 'src/app/shared/services/profile/profile.model';
import { ProfileService } from 'src/app/shared/services/profile/profile.service';
import { GlobalUtil } from 'src/app/shared/handlers/utils/global.utils';

@Component({
	selector: 'app-debt-form',
	templateUrl: './debt-form.component.html',
	styleUrls: ['./debt-form.component.css']
})
export class DebtFormComponent implements OnInit, OnDestroy {

	// Input
	@Input()
	debt: Debt | null = null
	
	@Input()
	isLoading: boolean = false

	// Output
	@Output()
	onSubmit: EventEmitter<object | null> = new EventEmitter()

	// Data
	profile: Profile | null = null
	selectedHuman: Human | null = null

	// Predefined
	readonly DebtType = DebtType
	readonly currCode = this.util.currencyCode
	readonly currDisplay = this.util.currencyDisplay
	readonly currDigitsInfo = this.util.currencyDigitsInfo

	// Form
	form = new FormGroup({
		type: new FormControl(null),
		human: new FormControl(null),
		notes: new FormControl(null),
		amount: new FormControl(null),
		due_at: new FormControl(null),
		is_paid: new FormControl(false)
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

	// Checker
	isNew: boolean = true
	isShowCalendar: boolean = false

	// Event
	onResetEvent: EventEmitter<boolean> = new EventEmitter()

	// Subscribe
	subscription: Subscription = new Subscription()

	constructor(
		private fb: FormBuilder,
		private util: GlobalUtil,
		private profileSvc: ProfileService
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
		this.form = this.fb.group({
			type: new FormControl(this.debt?.type ?? DebtType.LEND, Validators.compose([
				Validators.required
			])),
			human_id: new FormControl(this.debt?.human_id ?? null, Validators.compose([
				Validators.required
			])),
			notes: new FormControl(this.debt?.notes ?? null, Validators.compose([
				Validators.required,
				Validators.maxLength(128)
			])),
			amount: new FormControl(this.debt?.amount ?? null, Validators.compose([
				Validators.required,
				Validators.min(0.1)
			])),
			due_at: new FormControl(this.debt?.due_at ?? null),
			is_paid: new FormControl(this.debt?.is_paid ?? false)
		})

		this.selectedHuman = this.debt?.human as Human ?? null
		this.form.controls['human_id'].patchValue(this.selectedHuman.id)
	}

	doSubmit() {
		if (!this.form.touched) this.form.markAllAsTouched()
		if (this.form.valid) return this.onSubmit.emit(this.form.value)
		return this.onSubmit.emit(null)
	}

	toggleCalendar() {
		return this.isShowCalendar = !this.isShowCalendar
	}

	onSelectDue(selected: Date) {
		this.form.controls['due_at'].patchValue(selected)
		this.toggleCalendar()
	}

	onResetDue() {
		this.form.controls['due_at'].patchValue(null)
		this.onResetEvent.emit(true)
	}

	onSelectType(selected: DebtType) {
		this.form.controls['type'].patchValue(selected)
	}

	onSelectHuman(selected: Human) {
		this.selectedHuman = selected
		this.form.controls['human_id'].patchValue(this.selectedHuman.id)
	}

}
