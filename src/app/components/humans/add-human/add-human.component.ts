import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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

	// Input
	@Input()
	isSelectOpen: boolean = true

	// Output
	@Output()
	onSelect: EventEmitter<Human> = new EventEmitter()

	// Checker
	public isLoading: boolean = false

	// Data
	public results: Human[] = []
	public selectedHuman: Human | null = null
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

	constructor(
		private humanSvc: HumanService
	) { }

	ngOnInit(): void {
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
			this.results = this.filterHumans(this.humanForm.value)
		} else {
			// Reset results
			this.results = []
		}

		this.isLoading = false
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
				return human.name.toLowerCase().includes(lowerCaseText)
			}
		)
	}

	/**
	 * Add new human to saved list
	 */
	public onAddNew() {
		if (this.humanForm.value) {
			const newHuman = this.humanSvc.add(this.humanForm.value)
			this.onSelectHuman(newHuman)
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
		this.isSelectOpen = !this.isSelectOpen
		this.placeholderText = this.selectedHuman.name
		return this.onSelect.emit(this.selectedHuman)
	}

	/**
	 * On input focus. Update placeholder text
	 */
	public onFocusInput($event: any) {
		this.placeholderText = DEFAULT_PLACEHOLDER
	}

	/**
	 * On input blur. Update placeholder text
	 */
	public onBlurInput($event: any) {
		if (this.selectedHuman) {
			this.placeholderText = this.selectedHuman.name
		} else {
			this.placeholderText = DEFAULT_PLACEHOLDER
		}
	}

}
