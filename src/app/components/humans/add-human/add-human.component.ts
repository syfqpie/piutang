import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

import { Human } from 'src/app/shared/services/human/human.model';
import { HumanService } from 'src/app/shared/services/human/human.service';

const DEFAULT_PLACEHOLDER = 'Search name'

@Component({
	selector: 'pkt-add-human',
	templateUrl: './add-human.component.html',
	styleUrls: ['./add-human.component.css']
})
export class AddHumanComponent implements OnInit, AfterViewInit, OnDestroy {

	@Input()
	selectedHuman: Human | null = null

	// Output
	@Output()
	onSelect: EventEmitter<Human> = new EventEmitter()

	// Checker
	public isLoading: boolean = false
	public isFocused: boolean = false

	// Data
	public results: Human[] = []
	public placeholderText: string = DEFAULT_PLACEHOLDER

	// Form
	public humanForm: FormControl = new FormControl(
		null,
		Validators.compose([
			Validators.minLength(3)
		])
	)
	public formMessages = [
		{ type: 'minlength', message: 'At least 3 characters...' }
	]

	// Subscription
	private subscription: Subscription = new Subscription

	get isFormErrorDirty(): boolean {
		return !!this.humanForm.errors && this.humanForm.dirty
	}

	get isValidResults(): boolean {
		return this.results.length === 0 && !this.humanForm.errors && this.humanForm.dirty
	}

	get isCanOpen(): boolean {
		return this.isFormErrorDirty || this.results.length > 0 || this.isValidResults
	}

	constructor(
		private humanSvc: HumanService
	) { }

	ngOnInit(): void {
		if (this.selectedHuman) {
			this.placeholderText = this.selectedHuman.name!
		}
	}

	ngAfterViewInit(): void {
		// Subscribe to form changes
		this.subscription.add(
			this.humanForm.valueChanges
				.pipe(
					debounceTime(500),
					distinctUntilChanged()
				).subscribe(
					val => {
						this.onSearchValueChanged()
					}
				)
		)

		this.initHumans()
	}

	ngOnDestroy(): void {
		// Unsubscribe
		if (this.subscription) {
			this.subscription.unsubscribe()
		}
	}

	/**
	 * Triggered when search form changed
	 */
	async onSearchValueChanged() {
		this.isLoading = true

		if (this.humanForm.value &&
			String(this.humanForm.value).length >= 3) {
			try {
				await this.humanSvc.query(this.humanForm.value)
				this.results = this.humanSvc.humans
			} catch (err) {
				// handle error here
			} finally {
				this.isLoading = false
			}

		} else {
			// Reset results
			this.results = this.humanSvc.humans
			this.isLoading = false
		}
	}

	async initHumans() {
		// Set initial value
		try {
			await this.humanSvc.read()
			this.results = this.humanSvc.humans
		} catch (err) {
			// handle error here
		}
	}

	/**
	 * Filter humans by name
	 * 
	 * @param text text to filter
	 * @returns filtered humans
	 */
	public filterHumans(text: string) {
		const lowerCaseText: string = text.toLowerCase()
		return this.humanSvc.humans.filter(
			human => {
				return human.name!.toLowerCase().includes(lowerCaseText)
			}
		)
	}

	/**
	 * Add new human to saved list
	 */
	public onAddNew() {
		if (this.humanForm.value && this.humanForm.valid) this.doAddNew()
	}

	private async doAddNew() {
		this.isLoading = true
		let isError = false

		try {
			await this.humanSvc.create({ name: this.humanForm.value })
		} catch(err) {
			isError = true
		} finally {
			if (!isError && this.humanSvc.human) this.onSelectHuman(this.humanSvc.human)
			this.isLoading = false
		}
	}

	/**
	 * On select human from results list.
	 * Auto toggle on end of function
	 */
	public onSelectHuman(selected: Human) {
		this.selectedHuman = selected
		this.results = []
		this.humanForm.reset()
		this.placeholderText = this.selectedHuman.name!
		return this.onSelect.emit(this.selectedHuman)
	}

	/**
	 * On input focus. Update placeholder text
	 */
	public onFocusInput($event: any) {
		this.placeholderText = DEFAULT_PLACEHOLDER
		this.isFocused = true
	}

	/**
	 * On input blur. Update placeholder text
	 */
	public onBlurInput($event: any) {
		if (this.selectedHuman) {
			this.placeholderText = this.selectedHuman.name!
		} else {
			this.placeholderText = DEFAULT_PLACEHOLDER
		}
		this.humanForm.reset()
		this.isFocused = false
	}

}
