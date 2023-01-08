import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DebtType } from 'src/app/shared/services/debt/debt.model';
import { Human } from 'src/app/shared/services/human/human.model';

@Component({
	selector: 'app-add-new',
	templateUrl: './add-new.component.html',
	styleUrls: ['./add-new.component.css']
})
export class AddNewComponent implements OnInit {

	// Predefined
	public DebtType = DebtType

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
	public readonly currCode = 'MYR'
	public readonly currDisplay = 'symbol-narrow'
	public readonly currDigitsInfo = '1.2-2'

	// Form
	public createForm = new FormGroup({
		type: new FormControl(null),
		human: new FormControl(null),
		notes: new FormControl(null),
		amount: new FormControl(null),
		dueAt: new FormControl(null)
	})
	public formMessages = {
		type: [
			{ type: 'required', message: 'Need a type' }
		],
		human: [
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
	public selectedHuman: Human | null = null

	// Checker
	public isLoading: boolean = false
	public isShowCalendar: boolean = false

	// Event
	public onResetEvent: EventEmitter<boolean> = new EventEmitter()

	constructor(
		private fb: FormBuilder,
		private router: Router
	) { }

	ngOnInit(): void {
		this.initForm()
	}

	initForm() {
		this.createForm = this.fb.group({
			type: new FormControl(DebtType.LEND, Validators.compose([
				Validators.required
      		])),
			human: new FormControl(null, Validators.compose([
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
			dueAt: new FormControl(null)
		})
	}

	onSubmit() {
		/**
		 * Add submit logic here
		 */
		this.createForm.markAllAsTouched()

		if (this.createForm.valid) {
			// this.isLoading = true
			this.router.navigate(['/home'])
		}

	}

	toggleCalendar() {
		return this.isShowCalendar = !this.isShowCalendar
	}

	onSelectDue(selected: Date) {
		this.createForm.controls['dueAt'].patchValue(selected)
		this.toggleCalendar()
	}

	onResetDue() {
		this.createForm.controls['dueAt'].patchValue(null)
		this.onResetEvent.emit(true)
	}

	onSelectType(selected: DebtType) {
		this.createForm.controls['type'].patchValue(selected)
	}

	onSelectHuman(selected: Human) {
		this.selectedHuman = selected
		this.createForm.controls['human'].patchValue(this.selectedHuman.id)
	}

}
