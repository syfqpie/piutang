import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { GlobalUtil } from 'src/app/shared/handlers/utils/global.utils';
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
	readonly curCode = this.util.currencyCode
	readonly curDisplay = this.util.currencyDisplay
	readonly curDigitsInfo = this.util.currencyDigitsInfo

	constructor(
		private util: GlobalUtil
	) { }

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
