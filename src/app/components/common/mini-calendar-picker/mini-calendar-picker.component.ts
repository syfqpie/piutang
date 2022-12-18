import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

export interface DatePickerConfig {
	today: Date,
	todayDate: number,
	todayMonth: number,
	todayYear: number,
	lastDay: Date,
	lastDayDate: number,
	lastDayMonth: number,
	lastDayYear: number,
	selectedDate: Date | null,
	pageMonth: number,
	pageYear: number,
	pageNoOfDays: number[],
	pageBlankDays: number[]
}

@Component({
	selector: 'pkt-mini-calendar-picker',
	templateUrl: './mini-calendar-picker.component.html',
	styleUrls: ['./mini-calendar-picker.component.css']
})
export class MiniCalendarPickerComponent implements OnInit, OnDestroy {

	// Predefined
	public readonly MONTH_NAMES = [
		'January', 'February', 'March',
		'April', 'May', 'June', 'July',
		'August', 'September', 'October',
		'November', 'December'
	]
	public readonly DAYS = [
		'Sun', 'Mon', 'Tue', 'Wed',
		'Thu', 'Fri', 'Sat'
	]
	public readonly defaultExtYear: number = 5

	// Config
	public config: DatePickerConfig = this.defaultConfig()

	// Input
	@Input()
	isShowCalendar: boolean = false

	@Input()
	lastDay: Date | null = null

	@Input()
	onReset: EventEmitter<boolean> = new EventEmitter()

	// Ouput
	@Output()
	onToggle: EventEmitter<boolean> = new EventEmitter()

	@Output()
	onSelect: EventEmitter<Date> = new EventEmitter()

	// Subscriptions
	subscriptions: Subscription = new Subscription

	constructor() { }

	ngOnInit(): void {
		this.initSetup()
		this.initSubscription()
	}

	ngOnDestroy(): void {
		if (this.subscriptions) {
			this.subscriptions.unsubscribe()
		}
	}

	/**
	 * Init subscription for reset event
	 */
	initSubscription() {
		if (this.onReset) {
			this.subscriptions.add(
				this.onReset.subscribe(data => {
						if (data) this.resetCalendar()
					}
				)
			)
		}
	}
	
	/**
	 * Generate new default config
	 * 
	 * @returns New default config
	 */
	public defaultConfig(): DatePickerConfig {
		const today = new Date()
		const lastDay = new Date(new Date().setFullYear(
			new Date().getFullYear() + this.defaultExtYear
		))

		return {
			today: today,
			todayDate: today.getDate(),
			todayMonth: today.getMonth(),
			todayYear: today.getFullYear(),
			lastDay:lastDay,
			lastDayDate: lastDay.getMonth(),
			lastDayMonth: lastDay.getMonth(),
			lastDayYear: lastDay.getFullYear(),
			selectedDate: null,
			pageMonth: today.getMonth(),
			pageYear: today.getFullYear(),
			pageNoOfDays: [],
			pageBlankDays: []
		}
	}

	public initSetup() {
		this.setuplastDay()
		this.getNoOfDays()
	}

	private setuplastDay() {
		if (this.lastDay) this.config.lastDay = this.lastDay
	}

	/**
	 * Generate current page month
	 * days and date
	 */
	getNoOfDays() {
		let daysInMonth = new Date(this.config.pageYear, 
			this.config.pageMonth + 1, 0).getDate()

		// find where to start calendar day of week
		let dayOfWeek = new Date(this.config.pageYear, this.config.pageMonth).getDay()
		let blankDays = []
		for (var i = 1; i <= dayOfWeek; i++) {
			blankDays.push(i)
		}

		let days = []
		for (var i = 1; i <= daysInMonth; i++) {
			days.push(i)
		}

		this.config.pageBlankDays = blankDays
		this.config.pageNoOfDays = days
	}

	/**
	 * Switch calendar page to last month.
	 * Retrigger getNoOfDays
	 */
	prevMonth() {
		if (this.config.pageMonth === 0) {
			this.config.pageMonth = 11
			this.config.pageYear--
		} else {
			this.config.pageMonth--
		}

		// Reset page
		this.getNoOfDays()
	}

	/**
	 * Switch calendar page to next month.
	 * Retrigger getNoOfDays
	 */
	nextMonth() {
		if (this.config.pageMonth === 11) {
			this.config.pageMonth = 0
			this.config.pageYear++
		} else {
			this.config.pageMonth++
		}

		// Reset page
		this.getNoOfDays()
	}

	/**
	 * Toggle event fx
	 * 
	 * @returns emit onToggle event
	 */
	public toggle() {
		return this.onToggle.emit(true)
	}

	/**
	 * On select date action
	 * 
	 * @param selectedDate selected date
	 * @returns emit onSelect event
	 */
	public selectDate(selectedDate: number) {
		const selectedDay = new Date(this.config.pageYear, this.config.pageMonth, selectedDate)
		this.config.selectedDate = selectedDay
		return this.onSelect.emit(selectedDay)
	}

	/**
	 * Reset component config
	 */
	public resetCalendar() {
		this.config = this.defaultConfig()
		return this.initSetup()
	}

}
