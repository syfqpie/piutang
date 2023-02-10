import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { constants } from 'src/app/shared/handlers/utils/constants';
import { Debt, DebtType } from 'src/app/shared/services/debt/debt.model';

@Component({
	selector: 'app-debt-card',
	templateUrl: './debt-card.component.html',
	styleUrls: ['./debt-card.component.css']
})
export class DebtCardComponent implements OnInit {

	// Inputs
	@Input()
	debts: Debt[] = []

	// Outputs
	@Output()
	toggle: EventEmitter<string> = new EventEmitter()

	@Output()
	view: EventEmitter<string> = new EventEmitter()

	@Output()
	delete: EventEmitter<string> = new EventEmitter()

	// Predfined
	readonly DebtType = DebtType
	readonly curCode = constants.CURRENCY.code
	readonly curDisplay = constants.CURRENCY.display
	readonly curDigitsInfo = constants.CURRENCY.digitsInfo

	constructor() { }

	ngOnInit(): void { }

	onToggle(id: string) {
		return this.toggle.emit(id)
	}

	onView(id: string) {
		return this.view.emit(id)
	}

	onDelete(id: string) {
		return this.delete.emit(id)
	}

}
